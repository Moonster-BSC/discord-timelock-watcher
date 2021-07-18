// State of the app. Used by main driver. Can be modified via bot commands

/* STATE VARIABLES */

import { TimelockInfo } from "../types/timelockInfo";

// This is the block count at which the driver's last run used.
let blockIndex = 0;

// map of timelocks to track. Nickname to address map. Comes with some defaults, for testing
const timelockNicknameToTimelockInfoMap: Record<string, TimelockInfo> = {};

/* STATE MODIFIERS */

export const getBlockIndex = (): number => {
  return blockIndex;
};

// not async safe rn
export const setBlockIndex = (newIndex: number): void => {
  blockIndex = newIndex;
};

export const addTimelockToMap = (timelock: TimelockInfo): void => {
  timelockNicknameToTimelockInfoMap[timelock.nickname] = timelock;
};

export const removeTimelock = (nickName: string): void => {
  delete timelockNicknameToTimelockInfoMap[nickName];
};
