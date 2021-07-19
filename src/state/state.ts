// State of the app. Used by main driver. Can be modified via bot commands

import { TimelockStateInfo } from "../types/timelockStateInfo";
import { addressBook, ChainId } from "blockchain-addressbook";
import { SupportedChainId, supportedChains } from "../types/supportedChains";
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
let pollingInterval = 1;

// Which chains is the bot currently tracking
const isChainTrackedMap: Record<SupportedChainId, boolean> = {
  // these are default values
  [supportedChains.polygon]: true,
  [supportedChains.bsc]: false,
  [supportedChains.heco]: false,
  [supportedChains.fantom]: false,
};

// map of timelocks to track. Nickname to address map. Comes with some defaults, for testing
const timelockMap: Record<
  SupportedChainId,
  Record<string, TimelockStateInfo>
> = {
  [supportedChains.polygon]: {
    polypup: {
      nickname: "polypup",
      address: polypup.timelock,
      chainId: supportedChains.polygon,
      isActivelyWatched: true,
    },
    polypupBone: {
      nickname: "polypupBone",
      address: polypupBone.timelock,
      chainId: supportedChains.polygon,
      isActivelyWatched: true,
    },
  },
  [supportedChains.bsc]: {},
  [supportedChains.fantom]: {},
  [supportedChains.heco]: {},
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
  console.log(`Setting block index to ${newIndex}`);
  blockIndex = newIndex;
};

export const setPollingInterval = (newInterval: number): void => {
  console.log(`Updating polling interval to ${newInterval}`);
  pollingInterval = newInterval;
};

export const addTimelockToMap = (timelock: TimelockStateInfo): void => {
  console.log(
    `Adding timelock: ${timelock.nickname} on chainId: ${
      ChainId[timelock.chainId]
    }`
  );
  timelockMap[timelock.chainId][timelock.nickname] = timelock;
};

export const removeTimelock = (
  chainId: SupportedChainId,
  nickName: string
): void => {
  console.log(`Removing timelock: ${nickName} on chainId: ${ChainId[chainId]}`);
  delete timelockMap[chainId][nickName];
};

export const setIsChainTracked = (
  chainId: SupportedChainId,
  newValue: boolean
): void => {
  console.log(`Tracking ${ChainId[chainId]}`);
  isChainTrackedMap[chainId] = newValue;
};

export const setIsRunning = (newState: boolean): void => {
  console.log(`Bot is ${newState ? "running" : "stopped"}`);
  isRunning = newState;
};
