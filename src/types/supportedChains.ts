import { ChainId } from "blockchain-addressbook";

export const supportedChains = {
  [ChainId.bsc.toString()]: ChainId.bsc.toString(),
  [ChainId.heco.toString()]: ChainId.heco.toString(),
  [ChainId.polygon.toString()]: ChainId.polygon.toString(),
  [ChainId.fantom.toString()]: ChainId.fantom.toString(),
} as const;

export type SupportedChainId = keyof typeof supportedChains;
