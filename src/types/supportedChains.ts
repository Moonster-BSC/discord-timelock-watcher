export const supportedChains = {
  bsc: "bsc",
  heco: "heco",
  polygon: "polygon",
  fantom: "fantom",
} as const;

export const supportedChainToIdMap = {
  bsc: 56,
  heco: 128,
  polygon: 137,
  fantom: 250,
} as const;

export type SupportedChainId = keyof typeof supportedChains;
