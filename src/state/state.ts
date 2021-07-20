// State of the app. Used by main driver. Can be modified via bot commands. State variables should be moved to db really

import { TimelockStateInfo } from "../types/timelockStateInfo";
import { SupportedChainId, supportedChains } from "../types/supportedChains";
import { getUtcSecondsFromDate } from "../driver/helpers/getUtcSecondsFromDate";
import { ChainId } from "blockchain-addressbook";
import { getInitTimelockMap } from "./getInitTimelockMap";
import { TimelockMap } from "../types/timelockMap";

/* STATE VARIABLES */

// is main driver running, needs to be manually started
let isRunning = false;

// init starting timestamp to 3 weeks ago
// const initTimeAgo = 60 * 60 * 24 * 7 * 3; // sec * min * hrs * days * 3 weeks
const initTimeAgo = 60 * 60 * 24 * 1; // sec * min * hrs * 1 day

const utcSecondsNow = getUtcSecondsFromDate(new Date());
export const initIndex = utcSecondsNow - initTimeAgo;

// timestamp index, in UTC seconds. Represents a snapshot timerange. At first, tried using blocks, but then realized would have to maintain one per chain. Easier to calculate it on the fly.
let index = initIndex;

// interval at which bot will check for new transactions, units are minutes
const oneHour = 1 * 60;
let pollingInterval = oneHour;

// Which chains is the bot currently tracking
const isChainTrackedMap: Record<SupportedChainId, boolean> = {
  // these are default values
  [supportedChains.polygon]: true,
  [supportedChains.bsc]: true,
  [supportedChains.heco]: true,
  [supportedChains.fantom]: true,
};

// map of timelocks to track. Nickname to address map. Comes with some defaults, for testing
const timelockMap: TimelockMap = getInitTimelockMap();

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
  const messagePrefix = newValue ? "Tracking" : "Stopped tracking";
  console.log(`${messagePrefix} ${chainId}`);
  isChainTrackedMap[chainId] = newValue;
};

export const setIsRunning = (newState: boolean): void => {
  console.log(`Bot is ${newState ? "running" : "stopped"}`);
  isRunning = newState;
};
