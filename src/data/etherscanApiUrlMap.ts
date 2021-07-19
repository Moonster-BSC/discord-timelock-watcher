import { SupportedChainId } from "../types/supportedChains";

export interface EtherscanInfo {
  uiUrl: string;
  apiUrl: string;
  apiToken?: string;
}

export const etherscanApiUrlMap: Record<SupportedChainId, EtherscanInfo> = {
  bsc: {
    uiUrl: "",
    apiUrl: "https://api.bscscan.com",
    apiToken: "",
  },
  polygon: {
    uiUrl: "polygonscan.com",
    apiUrl: "https://api.polygonscan.com",
  },
  fantom: {
    uiUrl: "",
    apiUrl: "https://api.ftmscan.com",
    apiToken: "",
  },
  heco: {
    uiUrl: "",
    apiUrl: "https://api.hecoinfo.com",
    apiToken: "",
  },
} as const;
