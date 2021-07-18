// State of the app. Used by main driver. Can be modified via bot commands

// This is the block count at which the driver's last run used.
let blockIndex = 0;

export const getBlockIndex = (): number => {
  return blockIndex;
};

// not async safe rn
export const setBlockIndex = (newIndex: number): void => {
  blockIndex = newIndex;
};
