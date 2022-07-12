import * as ethers from "ethers";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface EscrowReturned0Event {
  buyer: string;
  value: ethers.BigNumber;
}

export interface OfferCancelled0Event {
  plotId: ethers.BigNumber;
  buyer: string;
  price: ethers.BigNumber;
}

export interface OfferMade0Event {
  plotId: ethers.BigNumber;
  buyer: string;
  price: ethers.BigNumber;
}

export interface PlotDelisted0Event {
  plotId: ethers.BigNumber;
  seller: string;
}

export interface PlotListed0Event {
  plotId: ethers.BigNumber;
  seller: string;
  price: ethers.BigNumber;
}

export interface PlotPriceChanged0Event {
  plotId: ethers.BigNumber;
  seller: string;
  oldPrice: ethers.BigNumber;
  newPrice: ethers.BigNumber;
}

export interface PlotPurchased0Event {
  plotId: ethers.BigNumber;
  seller: string;
  buyer: string;
  price: ethers.BigNumber;
}

export interface PlotResourceSet0Event {
  plotId: ethers.BigNumber;
  buyer: string;
}

export interface PlotTransferred0Event {
  plotIds: ethers.BigNumber;
  oldOwner: string;
  newOwner: string;
}

export interface PlotsBought0Event {
  plotIds: Array<ethers.BigNumber>;
  buyer: string;
  referrer: string;
  boughtWithCredits: boolean;
}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "EscrowReturned(address,uint256)":  {
    topic: abi.getEventTopic("EscrowReturned(address,uint256)"),
    decode(data: EvmEvent): EscrowReturned0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("EscrowReturned(address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        buyer: result[0],
        value: result[1],
      }
    }
  }
  ,
  "OfferCancelled(uint256,address,uint256)":  {
    topic: abi.getEventTopic("OfferCancelled(uint256,address,uint256)"),
    decode(data: EvmEvent): OfferCancelled0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("OfferCancelled(uint256,address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        plotId: result[0],
        buyer: result[1],
        price: result[2],
      }
    }
  }
  ,
  "OfferMade(uint256,address,uint256)":  {
    topic: abi.getEventTopic("OfferMade(uint256,address,uint256)"),
    decode(data: EvmEvent): OfferMade0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("OfferMade(uint256,address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        plotId: result[0],
        buyer: result[1],
        price: result[2],
      }
    }
  }
  ,
  "PlotDelisted(uint256,address)":  {
    topic: abi.getEventTopic("PlotDelisted(uint256,address)"),
    decode(data: EvmEvent): PlotDelisted0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("PlotDelisted(uint256,address)"),
        data.data || "",
        data.topics
      );
      return  {
        plotId: result[0],
        seller: result[1],
      }
    }
  }
  ,
  "PlotListed(uint256,address,uint256)":  {
    topic: abi.getEventTopic("PlotListed(uint256,address,uint256)"),
    decode(data: EvmEvent): PlotListed0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("PlotListed(uint256,address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        plotId: result[0],
        seller: result[1],
        price: result[2],
      }
    }
  }
  ,
  "PlotPriceChanged(uint256,address,uint256,uint256)":  {
    topic: abi.getEventTopic("PlotPriceChanged(uint256,address,uint256,uint256)"),
    decode(data: EvmEvent): PlotPriceChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("PlotPriceChanged(uint256,address,uint256,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        plotId: result[0],
        seller: result[1],
        oldPrice: result[2],
        newPrice: result[3],
      }
    }
  }
  ,
  "PlotPurchased(uint256,address,address,uint256)":  {
    topic: abi.getEventTopic("PlotPurchased(uint256,address,address,uint256)"),
    decode(data: EvmEvent): PlotPurchased0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("PlotPurchased(uint256,address,address,uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        plotId: result[0],
        seller: result[1],
        buyer: result[2],
        price: result[3],
      }
    }
  }
  ,
  "PlotResourceSet(uint256,string)":  {
    topic: abi.getEventTopic("PlotResourceSet(uint256,string)"),
    decode(data: EvmEvent): PlotResourceSet0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("PlotResourceSet(uint256,string)"),
        data.data || "",
        data.topics
      );
      return  {
        plotId: result[0],
        buyer: result[1],
      }
    }
  }
  ,
  "PlotTransferred(uint256,address,address)":  {
    topic: abi.getEventTopic("PlotTransferred(uint256,address,address)"),
    decode(data: EvmEvent): PlotTransferred0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("PlotTransferred(uint256,address,address)"),
        data.data || "",
        data.topics
      );
      return  {
        plotIds: result[0],
        oldOwner: result[1],
        newOwner: result[2],
      }
    }
  }
  ,
  "PlotsBought(uint256[],address,address,bool)":  {
    topic: abi.getEventTopic("PlotsBought(uint256[],address,address,bool)"),
    decode(data: EvmEvent): PlotsBought0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("PlotsBought(uint256[],address,address,bool)"),
        data.data || "",
        data.topics
      );
      return  {
        plotIds: result[0],
        buyer: result[1],
        referrer: result[2],
        boughtWithCredits: result[3],
      }
    }
  }
  ,
}

function getJsonAbi(): any {
  return [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "commonPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rarePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "epicPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "creatorFee",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "EscrowReturned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "OfferCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "OfferMade",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "PlotDelisted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "PlotListed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "oldPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newPrice",
          "type": "uint256"
        }
      ],
      "name": "PlotPriceChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "PlotPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "buyer",
          "type": "string"
        }
      ],
      "name": "PlotResourceSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "plotIds",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "PlotTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "plotIds",
          "type": "uint256[]"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bool",
          "name": "boughtWithCredits",
          "type": "bool"
        }
      ],
      "name": "PlotsBought",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "offerIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "acceptOffer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "name": "addAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "addReferrer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "plotIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "singleDiscountIndexes",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "multiDiscountIndexes",
          "type": "uint256[]"
        },
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "buyPlots",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "plotIds",
          "type": "uint256[]"
        },
        {
          "internalType": "enum LandSaleCore.Rarity",
          "name": "creditRarity",
          "type": "uint8"
        }
      ],
      "name": "buyWithCredits",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "canRefer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "offerIndex",
          "type": "uint256"
        }
      ],
      "name": "cancelOffer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "newPrice",
          "type": "uint256"
        }
      ],
      "name": "changePrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "delist",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBeneficiary",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        }
      ],
      "name": "getClaimableEscrow",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCreatorFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "getCurrentBid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDutchDuration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDutchMinMultiplier",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "getDutchPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDutchStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "getIsListed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "getListedInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "getListedPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMigrationLock",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNumPlotsSold",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "getOffers",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "cancelled",
              "type": "bool"
            }
          ],
          "internalType": "struct LandSaleMarket.Offer[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getOwnedPlotRarities",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint32",
              "name": "common",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "rare",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "epic",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "harb",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "premium",
              "type": "uint32"
            }
          ],
          "internalType": "struct Plots.OwnedPlotRarities",
          "name": "ownedPlotRarities",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getOwnedPlots",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPausedSales",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPausedTransfers",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "getPlotAvailability",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "getPlotData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "cyber",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "steampunk",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "wind",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "volcano",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "fire",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "water",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "necro",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "mecha",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "dragon",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "meadow",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "isShore",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "isIsland",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "isMountainFoot",
              "type": "uint8"
            },
            {
              "internalType": "enum LandSaleCore.Rarity",
              "name": "rarity",
              "type": "uint8"
            },
            {
              "internalType": "enum LandSaleCore.Entropy",
              "name": "entropy",
              "type": "uint8"
            }
          ],
          "internalType": "struct Plots.PlotData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPlotDataLock",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "getPlotOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "plotIds",
          "type": "uint256[]"
        }
      ],
      "name": "getPlotOwners",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        }
      ],
      "name": "getPlotResource",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "plotIds",
          "type": "uint256[]"
        }
      ],
      "name": "getPlotResourceBatch",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPricesPerRarity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "plotIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "singleDiscountIndexes",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "multiDiscountIndexes",
          "type": "uint256[]"
        }
      ],
      "name": "getPurchasePrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getReferralIsActive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getReferralMinCommonPlots",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserDataAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWhiteListPhase",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getXcRMRK",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "name": "isAdmin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "isReferrer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "list",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lockMigration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "makeOffer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "users",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "plotIds",
          "type": "uint256[]"
        }
      ],
      "name": "migratePlotOwners",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "xcRmrkPlotIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "singleDiscountIndexes",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "multiDiscountIndexes",
          "type": "uint256[]"
        },
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "creditsPlotIds",
          "type": "uint256[]"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "commonCredits",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rareCredits",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "epicCredits",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "premiumCredits",
              "type": "uint256"
            }
          ],
          "internalType": "struct LandSaleCore.UserCredits",
          "name": "userCredits",
          "type": "tuple"
        }
      ],
      "name": "mixBuy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "removeReferrer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "returnEscrowed",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "name": "revokeAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newAddress",
          "type": "address"
        }
      ],
      "name": "setBeneficiary",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "creatorFee",
          "type": "uint256"
        }
      ],
      "name": "setCreatorFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "multiplier",
          "type": "uint256"
        }
      ],
      "name": "setDutchConfig",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "paused",
          "type": "bool"
        }
      ],
      "name": "setPausedSales",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "paused",
          "type": "bool"
        }
      ],
      "name": "setPausedTransfers",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "cyber",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "steampunk",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "wind",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "volcano",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "fire",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "water",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "necro",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "mecha",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "dragon",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "meadow",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "isShore",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "isIsland",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "isMountainFoot",
              "type": "uint8"
            },
            {
              "internalType": "enum LandSaleCore.Rarity",
              "name": "rarity",
              "type": "uint8"
            },
            {
              "internalType": "enum LandSaleCore.Entropy",
              "name": "entropy",
              "type": "uint8"
            }
          ],
          "internalType": "struct Plots.PlotData",
          "name": "plotData",
          "type": "tuple"
        }
      ],
      "name": "setPlotData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "state",
          "type": "bool"
        }
      ],
      "name": "setPlotDataLock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "plotIds",
          "type": "uint256[]"
        },
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "cyber",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "steampunk",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "wind",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "volcano",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "fire",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "water",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "necro",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "mecha",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "dragon",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "meadow",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "isShore",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "isIsland",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "isMountainFoot",
              "type": "uint8"
            },
            {
              "internalType": "enum LandSaleCore.Rarity",
              "name": "rarity",
              "type": "uint8"
            },
            {
              "internalType": "enum LandSaleCore.Entropy",
              "name": "entropy",
              "type": "uint8"
            }
          ],
          "internalType": "struct Plots.PlotData[]",
          "name": "plotsData",
          "type": "tuple[]"
        }
      ],
      "name": "setPlotDataMulti",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "imgData",
          "type": "string"
        }
      ],
      "name": "setPlotResource",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "name": "setReferralIsActive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "minCommonPlots",
          "type": "uint256"
        }
      ],
      "name": "setReferralMinCommonPlots",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newAddress",
          "type": "address"
        }
      ],
      "name": "setUserDataAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "phaseId",
          "type": "uint256"
        }
      ],
      "name": "setWhitelistPhase",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newAddress",
          "type": "address"
        }
      ],
      "name": "setxcRMRK",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "plotIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "commonCredits",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rareCredits",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "epicCredits",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "premiumCredits",
          "type": "uint256"
        }
      ],
      "name": "smartBuyWithCredits",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "plotId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
