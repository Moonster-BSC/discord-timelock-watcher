import { ChainId } from "blockchain-addressbook";

interface EtherscanInfo {
  url: string;
  apiToken?: string;
}

export const etherscanApiUrlMap: Record<
  Exclude<ChainId, ChainId.avax>,
  EtherscanInfo
> = {
  [ChainId.bsc]: {
    url: "https://api.bscscan.com",
    apiToken: "",
  },
  [ChainId.polygon]: {
    url: "https://api.polygonscan.com",
  },
  [ChainId.fantom]: {
    url: "https://api.ftmscan.com",
    apiToken: "",
  },
  [ChainId.heco]: {
    url: "https://api.hecoinfo.com",
    apiToken: "",
  },
} as const;
