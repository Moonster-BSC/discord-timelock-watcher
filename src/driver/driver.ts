/*

Algorithm:

Every `intervalInHours`, for every chain, for every timelock
1. Make api call to get all transactions.
2. Build scanurl to see transaction
3. Push transaction object to global array
4. Sort global array
5. For each entry in array, send message to channel informing of transaction

*/

import { ChainId } from "blockchain-addressbook";
import { getTimelockMap, getTrackedChains } from "../state/state";

const intervalInHoursOptions = 1 | 2 | 4;

export const driverBuilder = (
  intervalInHours: typeof intervalInHoursOptions
) => {
  return 0;
};

const driver = async () => {
    const timelockMap = getTimelockMap();
    const trackedChains = getTrackedChains();
    for (const chain of trackedChains) {
        const etherscanInfo: 
    }
};
