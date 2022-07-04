import { ethers } from "ethers";
import * as kanaria from "./abi/kanaria";
import * as rmrk from "./abi/rmrk";
 
export const CHAIN_NODE = "wss://wss.api.moonriver.moonbeam.network";

export const contractKanaria = new ethers.Contract(
  "0x98AF019Cdf16990130CBA555861046B02e9898cC".toLowerCase(),
  kanaria.abi,
  new ethers.providers.WebSocketProvider(CHAIN_NODE)
);

export const contractRMRK = new ethers.Contract(
  "0xffffffFF893264794d9d57E1E0E21E0042aF5A0A".toLowerCase(),
  rmrk.abi,
  new ethers.providers.WebSocketProvider(CHAIN_NODE)
);