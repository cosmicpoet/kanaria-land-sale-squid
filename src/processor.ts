import {
  EvmLogHandlerContext,
  SubstrateEvmProcessor,
} from "@subsquid/substrate-evm-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { CHAIN_NODE, contract, createContractEntity } from "./contract";
import * as erc721 from "./abi/erc721";
import * as rmrk from "./abi/rmrk";
import * as kanaria from "./abi/kanaria";
import { Owner, Purchase, Plot } from "./model";

const processor = new SubstrateEvmProcessor("moonriver-substrate");

processor.setBatchSize(500);

processor.setDataSource({
  chain: CHAIN_NODE,
  archive: lookupArchive("moonriver")[0].url,
});

processor.setTypesBundle("moonbeam");

processor.addPreHook({ range: { from: 0, to: 0 } }, async (ctx) => {
  await ctx.store.save(createContractEntity());
});

processor.addEvmLogHandler(
  contract.address,
  {
    filter: [kanaria.events["PlotsBought(uint256[],address,address,bool)"].topic],
  },
  contractLogsHandler
);

export async function contractLogsHandler(
  ctx: EvmLogHandlerContext
): Promise<void> {
  const bought = kanaria.events["PlotsBought(uint256[],address,address,bool)"].decode(ctx);
  const { plotIds, boughtWithCredits } = bought;

  let buyer = await ctx.store.get(Owner, bought.buyer);
  if (buyer == null) {
    buyer = new Owner({ id: bought.buyer, ownedPlots: [] });
    await ctx.store.save(buyer);
  }

  let referrer = await ctx.store.get(Owner, bought.referrer);
  if (referrer == null) {
    referrer = new Owner({ id: bought.referrer, ownedPlots: [] });
    await ctx.store.save(referrer);
  }

  for (const plotId of plotIds) {
    let plot = await ctx.store.get(Plot, plotId.toString());
    if (plot == null) {
      plot = new Plot({ id: plotId.toString(), owner: buyer });
      await ctx.store.save(plot)
    }

    let purchase = await ctx.store.get(Purchase, `${ctx.txHash}_${plotId.toString()}`);
    if (purchase == null) {
      purchase = new Purchase({
        id: `${ctx.txHash}_${plotId.toString()}`,
        plot,
        buyer,
        referrer,
        boughtWithCredits,
        timestamp: BigInt(ctx.substrate.block.timestamp),
        block: ctx.substrate.block.height,
        transactionHash: ctx.txHash,
      })
      await ctx.store.save(purchase)
    }
  }
}

processor.run();
