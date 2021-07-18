import { SupportedChainId } from ".";

export interface TimelockInfo {
  // normalized, wonder if needed though
  nickname: string;
  address: string;
  chainId: SupportedChainId;
  isActivelyWatched: boolean;
}
