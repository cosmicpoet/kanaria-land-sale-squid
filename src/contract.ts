<<<<<<< HEAD
=======
import {assertNotNull} from "@subsquid/substrate-processor";
import {Store} from "@subsquid/typeorm-store";
>>>>>>> 7ac80c2277681abd9e96848799f28ddde145623a
import { ethers } from "ethers";
// import * as erc721 from "./abi/erc721";
import * as kanaria from "./abi/kanaria";
 
export const CHAIN_NODE = "wss://wss.api.moonriver.moonbeam.network";

export const contract = new ethers.Contract(
  "0x98AF019Cdf16990130CBA555861046B02e9898cC".toLowerCase(),
  kanaria.abi,
  new ethers.providers.WebSocketProvider(CHAIN_NODE)
);