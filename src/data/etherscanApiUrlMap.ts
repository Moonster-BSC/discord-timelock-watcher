import { SupportedChainId } from "../types/supportedChains";
import dotenv from "dotenv";
dotenv.config();

export interface EtherscanInfo {
  uiUrl: string;
  apiUrl: string;
  apiToken?: string;
}

const apiTokenKeyMap: Record<SupportedChainId, string> = {
  bsc: "bsc_apitoken",
  polygon: "polygon_apitoken",
  heco: "heco_apitoken",
  fantom: "fantom_apitoken",
};

const getApiToken = (key: string) => {
  const token = process.env[key] ? process.env[key] : "";
  return token;
};

export const etherscanApiUrlMap: Record<SupportedChainId, EtherscanInfo> = {
  bsc: {
    uiUrl: "bscscan.com",
    apiUrl: "https://api.bscscan.com",
    apiToken: getApiToken(apiTokenKeyMap.bsc),
  },
  polygon: {
    uiUrl: "polygonscan.com",
    apiUrl: "https://api.polygonscan.com",
    apiToken: getApiToken(apiTokenKeyMap.bsc),
  },
  fantom: {
    uiUrl: "ftmscan.com",
    apiUrl: "https://api.ftmscan.com",
    apiToken: getApiToken(apiTokenKeyMap.bsc),
  },
  heco: {
    uiUrl: "hecoscan.xyz",
    apiUrl: "https://api.hecoinfo.com",
    apiToken: getApiToken(apiTokenKeyMap.bsc),
  },
} as const;
