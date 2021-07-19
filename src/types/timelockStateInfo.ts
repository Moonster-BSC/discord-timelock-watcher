import { SupportedChainId } from "./supportedChains";

export interface TimelockStateInfo {
  // normalized, wonder if needed though
  nickname: string;
  address: string;
  chainId: SupportedChainId;
  isActivelyWatched: boolean;
}
