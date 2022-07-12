import { ethers } from "ethers";
import * as kanaria from "./abi/kanaria";
import * as kanariaNew from "./abi/kanariaNew";
import * as rmrk from "./abi/rmrk";

export const CHAIN_NODE = "wss://wss.api.moonriver.moonbeam.network";

export const contractKanaria = new ethers.Contract(
  "0x98AF019Cdf16990130CBA555861046B02e9898cC".toLowerCase(),
  kanaria.abi,
  new ethers.providers.WebSocketProvider(CHAIN_NODE)
);

// Note: https://twitter.com/SkybreachNFT/status/1545541419334606848
// The Land Sale Contract will migrate to new Contract on `11th July 2022 16:00 CET`

export const contractKanariaNew = new ethers.Contract(
  "0x913a3E067a559Ba24A7a06a6CDEa4837EEEAF72d".toLowerCase(),
  kanariaNew.abi,
  new ethers.providers.WebSocketProvider(CHAIN_NODE)
);
export const contractRMRK = new ethers.Contract(
  "0xffffffFF893264794d9d57E1E0E21E0042aF5A0A".toLowerCase(),
  rmrk.abi,
  new ethers.providers.WebSocketProvider(CHAIN_NODE)
);
