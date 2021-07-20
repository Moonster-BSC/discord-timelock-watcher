import { supportedChains } from "../types/supportedChains";
import { addressBook } from "blockchain-addressbook";
import { TimelockMap } from "../types/timelockMap";
const {
  polygon: {
    platforms: { polypup, polypupBone },
  },
} = addressBook;

// need to either read this from json file, that we periodically dump to, or just read this from a db on init.
// For now this is just using hardcoded state and isn't persisting it anywhere else besides in memory.
export const getInitTimelockMap = (): TimelockMap => {
  const timelockMap: TimelockMap = {
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
      xYeld: {
        nickname: "xYeld",
        address: "0x6a582111f1b9d5a579bae011948067a9a09e2d8b",
        chainId: supportedChains.polygon,
        isActivelyWatched: true,
      },
    },
    [supportedChains.bsc]: {
      biswap: {
        nickname: "biswap",
        address: "0xf5d6fed0f4735ff2036ce4be535bd32e77dae9fe",
        chainId: supportedChains.bsc,
        isActivelyWatched: true,
      },
    },
    [supportedChains.fantom]: {},
    [supportedChains.heco]: {},
  };
  return timelockMap;
};
