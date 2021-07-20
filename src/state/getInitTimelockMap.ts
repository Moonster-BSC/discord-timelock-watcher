import { SupportedChainId, supportedChains } from "../types/supportedChains";
import { TimelockStateInfo } from "../types/timelockStateInfo";
import { addressBook } from "blockchain-addressbook";
const {
  polygon: {
    platforms: { polypup, polypupBone },
  },
} = addressBook;

// need to either read this from json file, that we periodically dump to, or just read this from a db on init.
// For now this is just using hardcoded state and isn't persisting it anywhere else besides in memory.
export const getInitTimelockMap = (): Record<
  SupportedChainId,
  Record<string, TimelockStateInfo>
> => {
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
      xYeld: {
        nickname: "xYeld",
        address: "0x6a582111f1b9d5a579bae011948067a9a09e2d8b",
        chainId: supportedChains.polygon,
        isActivelyWatched: true,
      },
    },
    [supportedChains.bsc]: {},
    [supportedChains.fantom]: {},
    [supportedChains.heco]: {},
  };
  return timelockMap;
};
