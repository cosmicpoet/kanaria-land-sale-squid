import { lookupArchive } from "@subsquid/archive-registry"
import { Store, TypeormDatabase } from "@subsquid/typeorm-store"
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor"
import { BigNumber } from "ethers"

import { CHAIN_NODE, contractKanaria, contractKanariaNew, contractRMRK } from "./contract"
import * as rmrk from "./abi/rmrk"
import * as kanaria from "./abi/kanaria"
import * as kanariaNew from "./abi/kanariaNew"
import { Buyer, Referrer, Sale, Plot } from "./model"

// types and interfaces
type Item = BatchProcessorItem<typeof processor>
type Context = BatchContext<Store, Item>

interface SaleTransaction {
  txHash: string
  buyer: string
  referrer: string
  boughtWithCredits: boolean
  plotIds: BigNumber[]
  amount: bigint
  timestamp: number
  block: number
}

interface TransferTransaction {
  txHash: string
  value: bigint
}

// processor setup
const database = new TypeormDatabase()
const processor = new SubstrateBatchProcessor()
  .setBlockRange({ from: 2000000 })
  .setBatchSize(100)
  .setDataSource({
    chain: CHAIN_NODE,
    archive: lookupArchive("moonriver", { release: "FireSquid" }),
  })
  .setTypesBundle("moonriver")
  .addEvmLog(contractKanaria.address, {
    filter: [
      kanaria.events["PlotsBought(uint256[],address,address,bool)"].topic,
    ],
  })
  .addEvmLog(contractRMRK.address, {
    filter: [
      rmrk.events["Transfer(address,address,uint256)"].topic,
    ],
  })

processor.run(database, processBatches)

// processor functions

async function processBatches(ctx: Context) {
  // create map stores for saleTransactions and transferTransactions
  const saleTransactions = new Map<string, SaleTransaction>()
  const transferTransactions = new Map<string, TransferTransaction>()
  // looping through blocks and items within each block
  for (const block of ctx.blocks) {
    const { timestamp, height } = block.header
    for (const item of block.items) {
      if (item.name === "EVM.Log") {
        const txHash = item.event.evmTxHash
        // create a saleTransaction for each PlotsBought event log, and populate the map
        if (item.event.args.address === contractKanaria.address || item.event.args.address === contractKanariaNew.address) {
          const topic = item.event.args.topics[0];
          const eventsList = [
            kanaria.events["PlotsBought(uint256[],address,address,bool)"],
            kanariaNew.events["PlotsBought(uint256[],address,address,bool)"],
          ];
          const targetEvent = eventsList.find(event => event.topic === topic);

          if (
            targetEvent
          ) {
            const bought = targetEvent.decode(item.event.args)
            const saleTransaction = {
              txHash,
              buyer: bought.buyer,
              referrer: bought.referrer,
              boughtWithCredits: bought.boughtWithCredits,
              plotIds: bought.plotIds,
              amount: 0n,
              timestamp,
              block: height
            } as SaleTransaction
            saleTransactions.set(`${saleTransaction.txHash}_${saleTransaction.boughtWithCredits.toString()}`, saleTransaction)
          }
        }
        // create a transferTransaction for each RMRK Transfer event log, and populate the map
        else if (item.event.args.address === contractRMRK.address) {
          if (
            item.event.args.topics[0] ===
            rmrk.events["Transfer(address,address,uint256)"].topic
          ) {
            const transfer = rmrk.events[
              "Transfer(address,address,uint256)"
            ].decode(item.event.args)
            if (!transferTransactions.has(txHash)) {
              const transferTransaction = {
                txHash,
                value: 0n
              } as TransferTransaction
              transferTransactions.set(txHash, transferTransaction)
            }
            transferTransactions.get(txHash)!.value += transfer.value.toBigInt()
          }
        }
      }
    }
  }
  // log the transfer values to saleTransactions, then create entities to save / persist
  processTransfers(ctx, saleTransactions, transferTransactions)
  await saveEntities(ctx, saleTransactions)
}

function processTransfers(
  ctx: Context,
  saleTransactions: Map<string, SaleTransaction>,
  transferTransactions: Map<string, TransferTransaction>
) {
  for (const [id, saleTransaction] of saleTransactions.entries()) {
    const [txHash, boughtWithCredits] = id.split("_")
    if (boughtWithCredits === "false") {
      if (transferTransactions.has(txHash)) {
        saleTransaction.amount = transferTransactions.get(txHash)!.value
      }
    }
  }
}

async function saveEntities(ctx: Context, saleTransactions: Map<string, SaleTransaction>) {
  // create map stores
  const buyers = new Map<string, Buyer>()
  const referrers = new Map<string, Referrer>()
  const sales = new Map<string, Sale>()
  const plots = new Map<string, Plot>()
  // for each saleTransaction, create relevant entities
  for (const saleTransaction of saleTransactions.values()) {
    // create Buyer
    let buyer = await ctx.store.get(Buyer, saleTransaction.buyer)
    if (buyer == null) {
      buyer = new Buyer({ id: saleTransaction.buyer })
    }
    buyers.set(buyer.id, buyer)
    // create Referrer
    let referrer = await ctx.store.get(Referrer, saleTransaction.referrer)
    if (referrer == null) {
      referrer = new Referrer({ id: saleTransaction.referrer })
    }
    referrers.set(referrer.id, referrer)
    // create Sale
    let sale = await ctx.store.get(Sale, `${saleTransaction.txHash}_${saleTransaction.boughtWithCredits.toString()}`)
    if (sale == null) {
      sale = new Sale({
        id: `${saleTransaction.txHash}_${saleTransaction.boughtWithCredits.toString()}`,
        txHash: saleTransaction.txHash,
        amount: saleTransaction.amount,
        buyer,
        referrer,
        boughtWithCredits: saleTransaction.boughtWithCredits,
        timestamp: BigInt(saleTransaction.timestamp),
        block: saleTransaction.block
      })
    }
    sales.set(sale.id, sale)
    // create Plots
    for (const plotId of saleTransaction.plotIds) {
      let plot = await ctx.store.get(Plot, plotId.toString())
      if (plot == null) {
        plot = new Plot({
          id: plotId.toString(),
          plotId: plotId.toBigInt(),
          buyer,
          referrer,
          sale,
        })
      }
      plots.set(plot.id, plot)
    }
  }
  // batch saving / persisting the entities
  await ctx.store.save([...buyers.values()])
  await ctx.store.save([...referrers.values()])
  await ctx.store.save([...sales.values()])
  await ctx.store.save([...plots.values()])
}