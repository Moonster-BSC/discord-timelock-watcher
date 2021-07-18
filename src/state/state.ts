// State of the app. Used by main driver. Can be modified via bot commands

/* STATE VARIABLES */

import { TimelockInfo } from "../types/timelockInfo";
import { addressBook, ChainId } from "blockchain-addressbook";
import { SupportedChainId } from "../types";
const {
  polygon: {
    platforms: { polypup, polypupBone },
  },
} = addressBook;

// This is the block count at which the driver's last run used.
let blockIndex = 0;

// map of timelocks to track. Nickname to address map. Comes with some defaults, for testing
const timelockMap: Record<SupportedChainId, Record<string, TimelockInfo>> = {
  [ChainId.polygon]: {
    polypup: {
      nickname: "polypup",
      address: polypup.timelock,
      chainId: ChainId.polygon,
      isActivelyWatched: true,
    },
    polypupBone: {
      nickname: "polypupBone",
      address: polypupBone.timelock,
      chainId: ChainId.polygon,
      isActivelyWatched: true,
    },
  },
  [ChainId.bsc]: {},
  [ChainId.fantom]: {},
  [ChainId.heco]: {},
};

/* STATE MODIFIERS */

export const getBlockIndex = (): number => {
  return blockIndex;
};

// not async safe rn
export const setBlockIndex = (newIndex: number): void => {
  blockIndex = newIndex;
};

export const addTimelockToMap = (timelock: TimelockInfo): void => {
  timelockMap[timelock.chainId][timelock.nickname] = timelock;
};

export const removeTimelock = (
  chainId: SupportedChainId,
  nickName: string
): void => {
  delete timelockMap[chainId][nickName];
};
