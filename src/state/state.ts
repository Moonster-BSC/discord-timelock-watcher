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

// init starting timestamp to 3 weeks ago
export const initTimeAgo = 60 * 60 * 24 * 7 * 3; // sec * min * hrs * days * 3 weeks

// timestamp index, in UTC seconds. Represents a snapshot timerange. At first, tried using blocks, but then realized would have to maintain one per chain. Easier to calculate it on the fly.
let index = Date.now() - initTimeAgo;

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

export const getIndex = (): number => {
  return index;
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
export const setIndex = (newIndex: number): void => {
  console.log(`Setting index to ${newIndex}`);
  index = newIndex;
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
