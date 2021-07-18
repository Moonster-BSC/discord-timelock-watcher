/*

Algorithm:

Every `intervalInHours`, for every chain, for every timelock
1. Make api call to get all transactions.
2. Build scanurls to see transaction
3. Push transaction object to global array
4. Sort global array
5. For each entry in array, send message to channel informing of transaction

*/

import { getTransactionList } from "../data/api";
import { etherscanApiUrlMap, EtherscanInfo } from "../data/etherscanApiUrlMap";
import {
  getBlockIndex,
  getTimelockMap,
  getTrackedChains,
} from "../state/state";
import { Transaction } from "../types/etherscanApi/ListAccountTransactionsResponse";
import { TimelockInfo } from "../types/timelockInfo";

const intervalInHoursOptions = 1 | 2 | 4;

export const driverBuilder = (
  intervalInHours: typeof intervalInHoursOptions
) => {
  return 0;
};

const driver = async () => {
  // global driver variables
  const timelockMap = getTimelockMap();
  const trackedChains = getTrackedChains();
  const startBlock = getBlockIndex();
  for (const chain of trackedChains) {
    console.log(`Analyzing chain ${chain.toString()}`);
    // chain relevant variables
    const etherscanInfo: EtherscanInfo = etherscanApiUrlMap[chain];
    const chainTimelocks: Record<string, TimelockInfo> = timelockMap[chain];

    // loop through all timelocks in chain
    for (const nickname of Object.keys(chainTimelocks)) {
      console.log(`Analyzing timelock ${nickname}`);

      // should never be undefined, based on state modifying functions
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const timelockInfo = chainTimelocks[nickname]!;
      const { address } = timelockInfo;

      // 1. Make api call to get all transactions.
      let transactionList: Transaction[] = [];
      try {
        transactionList = await getTransactionList(
          address,
          startBlock,
          etherscanInfo
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(`Failed to pull tx list for timelock: ${nickname}`);
        // may not need if array above stays empty after call fails
        continue;
      }

      // 2. Build scanurls to see transaction
      const transactionUrls = transactionList.map((tx) => {
        const { hash } = tx;
      });
    }
  }
};
