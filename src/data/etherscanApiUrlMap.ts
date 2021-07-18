import { ChainId } from "blockchain-addressbook";
import { SupportedChainId } from "../types";

export interface EtherscanInfo {
  uiUrl: string;
  apiUrl: string;
  apiToken?: string;
}

export const etherscanApiUrlMap: Record<SupportedChainId, EtherscanInfo> = {
  [ChainId.bsc]: {
    uiUrl: "polygonscan.com",
    apiUrl: "https://api.bscscan.com",
    apiToken: "",
  },
  [ChainId.polygon]: {
    uiUrl: "",
    apiUrl: "https://api.polygonscan.com",
  },
  [ChainId.fantom]: {
    uiUrl: "",
    apiUrl: "https://api.ftmscan.com",
    apiToken: "",
  },
  [ChainId.heco]: {
    uiUrl: "",
    apiUrl: "https://api.hecoinfo.com",
    apiToken: "",
  },
} as const;
