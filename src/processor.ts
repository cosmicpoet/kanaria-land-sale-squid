import { lookupArchive } from "@subsquid/archive-registry"
import { Store, TypeormDatabase } from "@subsquid/typeorm-store"
import {
  // BatchBlock,
  BatchContext,
  // BatchProcessorCallItem,
  // BatchProcessorEventItem,
  BatchProcessorItem,
  // EvmLogEvent,
  SubstrateBatchProcessor,
  // SubstrateBlock,
} from "@subsquid/substrate-processor"
import { BigNumber } from "ethers"

import { CHAIN_NODE, contract } from "./contract"
// import * as erc721 from "./abi/erc721"
// import * as rmrk from "./abi/rmrk"
import * as kanaria from "./abi/kanaria"
import { Buyer, Referrer, Sale, Plot } from "./model"


type Item = BatchProcessorItem<typeof processor>
// type EventItem = BatchProcessorEventItem<typeof processor>
// type CallItem = BatchProcessorCallItem<typeof processor>
type Context = BatchContext<Store, Item>

interface SaleTransaction {
  txHash: string
  buyer: string
  referrer: string
  boughtWithCredits: boolean
  plotIds: BigNumber[]
  timestamp: number
  block: number
}

const database = new TypeormDatabase()
const processor = new SubstrateBatchProcessor()
  .setBlockRange({ from: 2000000 })
  .setBatchSize(100)
  .setDataSource({
    chain: CHAIN_NODE,
    archive: lookupArchive("moonriver", { release: "FireSquid" }),
  })
  .setTypesBundle("moonriver")
  .addEvmLog(contract.address, {
    filter: [
      kanaria.events["PlotsBought(uint256[],address,address,bool)"].topic,
    ],
  })
// .addEvmLog(/* secondContractAdress */, {
//   filter: [
//     abi.events["Your event name"].topic,
//   ],
// })

processor.run(database, async (ctx) => {
  const saleTransactions = new Map<string, SaleTransaction>()

  for (const block of ctx.blocks) {
    const { timestamp, height } = block.header
    for (const item of block.items) {
      if (item.name === "EVM.Log") {
        if (item.event.args.address === contract.address) {
          if (
            item.event.args.topics[0] ===
            kanaria.events["PlotsBought(uint256[],address,address,bool)"].topic
          ) {
            const txHash = item.event.evmTxHash
            const bought = kanaria.events[
              "PlotsBought(uint256[],address,address,bool)"
            ].decode(item.event.args)
            const saleTransaction = {
              txHash,
              buyer: bought.buyer,
              referrer: bought.referrer,
              boughtWithCredits: bought.boughtWithCredits,
              plotIds: bought.plotIds,
              timestamp,
              block: height
            } as SaleTransaction
            saleTransactions.set(txHash, saleTransaction)
          }
        }
        // else if (contractAddress === secondContractAdress) {

        // }
      }
    }
  }

  // create entities to save / persist
  await saveEntities(ctx, saleTransactions)
})

async function saveEntities(ctx: Context, saleTransactions: Map<string, SaleTransaction>) {
  const buyers = new Map<string, Buyer>()
  const referrers = new Map<string, Referrer>()
  const sales = new Map<string, Sale>()
  const plots = new Map<string, Plot>()

  for (const saleTransaction of saleTransactions.values()) {
    let buyer = await ctx.store.get(Buyer, saleTransaction.buyer)
    if (buyer == null) {
      buyer = new Buyer({ id: saleTransaction.buyer })
    }
    buyers.set(buyer.id, buyer)

    let referrer = await ctx.store.get(Referrer, saleTransaction.referrer)
    if (referrer == null) {
      referrer = new Referrer({ id: saleTransaction.referrer })
    }
    referrers.set(referrer.id, referrer)

    let sale = await ctx.store.get(Sale, `${saleTransaction.txHash}_${saleTransaction.boughtWithCredits.toString()}`)
    if (sale == null) {
      sale = new Sale({
        id: `${saleTransaction.txHash}_${saleTransaction.boughtWithCredits.toString()}`,
        amount: 0n,
        buyer,
        referrer,
        boughtWithCredits: saleTransaction.boughtWithCredits,
        timestamp: BigInt(saleTransaction.timestamp),
        block: saleTransaction.block
      })
    }
    sales.set(sale.id, sale)

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

  await ctx.store.save([...buyers.values()])
  await ctx.store.save([...referrers.values()])
  await ctx.store.save([...sales.values()])
  await ctx.store.save([...plots.values()])
}

// export async function handleKanaria(
//   ctx: BatchContext<Store, unknown>,
//   block: SubstrateBlock,
//   event: EvmLogEvent
// ): Promise<void> {
//   const bought = kanaria.events[
//     "PlotsBought(uint256[],address,address,bool)"
//   ].decode(event.args)
//   const { plotIds, boughtWithCredits } = bought

//   let buyer = await ctx.store.get(Owner, bought.buyer)
//   if (buyer == null) {
//     buyer = new Owner({ id: bought.buyer, ownedPlots: [] })
//     await ctx.store.save(buyer)
//   }

//   let referrer = await ctx.store.get(Owner, bought.referrer)
//   if (referrer == null) {
//     referrer = new Owner({ id: bought.referrer, ownedPlots: [] })
//     await ctx.store.save(referrer)
//   }

//   let purchase = await ctx.store.get(Purchase, event.evmTxHash)
//   if (purchase == null) {
//     purchase = new Purchase({
//       id: event.evmTxHash,
//       buyer,
//       referrer,
//       boughtWithCredits,
//       timestamp: BigInt(block.timestamp),
//       block: block.height,
//     })
//     await ctx.store.save(purchase)
//   }

//   const plots = []
//   for (const plotId of plotIds) {
//     let plot = await ctx.store.get(Plot, plotId.toString())
//     if (plot == null) {
//       plot = new Plot({ id: plotId.toString(), owner: buyer, purchase })
//       plots.push(plot)
//     }
//   }
//   await ctx.store.save(plots)
// }
