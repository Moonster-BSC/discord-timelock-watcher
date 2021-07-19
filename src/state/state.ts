// State of the app. Used by main driver. Can be modified via bot commands

import { TimelockStateInfo } from "../types/timelockStateInfo";
import { addressBook, ChainId } from "blockchain-addressbook";
import { SupportedChainId } from "../types";
const {
  polygon: {
    platforms: { polypup, polypupBone },
  },
} = addressBook;

/* STATE VARIABLES */

// is main driver running
let isRunning = true;

// This is the block count at which the driver's last run used.
let blockIndex = 0;

// interval at which bot will check for new transactions, in hours
const pollingInterval = 1;

// Which chains is the bot currently tracking
const isChainTrackedMap: Record<SupportedChainId, boolean> = {
  // these are default values
  [ChainId.polygon]: true,
  [ChainId.bsc]: false,
  [ChainId.fantom]: false,
  [ChainId.heco]: false,
};

// map of timelocks to track. Nickname to address map. Comes with some defaults, for testing
const timelockMap: Record<
  SupportedChainId,
  Record<string, TimelockStateInfo>
> = {
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

/* STATE GETTERS */

export const getIsRunning = (): boolean => {
  return isRunning;
};

export const getBlockIndex = (): number => {
  return blockIndex;
};

export const getPollingInterval = (): number => {
  return pollingInterval;
};

export const getTimelockMap = (): typeof timelockMap => {
  return timelockMap;
};

export const getIsChainTrackedMap = (): Record<SupportedChainId, boolean> => {
  return isChainTrackedMap;
};

export const getTrackedChains = (): SupportedChainId[] => {
  const trackedChains: SupportedChainId[] = [];
  for (const chain in isChainTrackedMap) {
    const c = chain as unknown as SupportedChainId;
    if (isChainTrackedMap[c] === true) {
      trackedChains.push(c);
    }
  }
  return trackedChains;
};

export const listChainTimelocks = (
  chainId: SupportedChainId
): TimelockStateInfo[] => {
  const chainTimelocks = timelockMap[chainId];
  const chainTimelockList = Object.values(chainTimelocks);
  return chainTimelockList;
};

/*  STATE MODIFIERS */

// none are async safe rn
export const setBlockIndex = (newIndex: number): void => {
  blockIndex = newIndex;
};

export const addTimelockToMap = (timelock: TimelockStateInfo): void => {
  timelockMap[timelock.chainId][timelock.nickname] = timelock;
};

export const removeTimelock = (
  chainId: SupportedChainId,
  nickName: string
): void => {
  delete timelockMap[chainId][nickName];
};

export const setIsChainTracked = (
  chainId: SupportedChainId,
  newValue: boolean
): void => {
  isChainTrackedMap[chainId] = newValue;
};

export const setIsRunning = (newState: boolean): void => {
  isRunning = newState;
};
