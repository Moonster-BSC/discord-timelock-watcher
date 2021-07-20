/*

Algorithm:

Every `intervalInHours`, for every chain, for every timelock
1. Make api call to get all transactions.
2. Build display objects (TimelockTransactionDisplayInfo)
3. Push transaction object to global array
4. Sort global array
5. For each entry in array, send message to channel informing of transaction
6. Increment block index
*/

import { getTransactionList } from "../../data/api";
import {
  EtherscanInfo,
  etherscanApiUrlMap,
} from "../../data/etherscanApiUrlMap";
import { getTimelockMap, getTrackedChains } from "../../state/state";
import { Transaction } from "../../types/etherscanApi/ListAccountTransactionsResponse";
import { TimelockStateInfo } from "../../types/timelockStateInfo";
import { TimelockTransactionDisplayInfo } from "../../types/timelockTransactionDisplayInfo";
import { buildTimelockTransactionDisplayInfoFromTransaction } from "./buildTimelockTransactionDisplayInfoFromTransaction";
import { getBlockFromEtherscan } from "./getLatestBlock";
import { pushArray } from "./pushArray";

export const getTimelockTransactionsInTimeRangeAsc = async (
  startTime: number,
  endTime: number
): Promise<TimelockTransactionDisplayInfo[]> => {
  // global driver variables
  const timelockMap = getTimelockMap();
  const trackedChains = getTrackedChains();

  // output state
  const allTimelockTransactionsSinceStartBlock: TimelockTransactionDisplayInfo[] =
    [];

  for (const chain of trackedChains) {
    console.log(`Analyzing chain ${chain.toString()}`);
    // chain relevant variables
    const etherscanInfo: EtherscanInfo = etherscanApiUrlMap[chain];
    const chainTimelocks: Record<string, TimelockStateInfo> =
      timelockMap[chain];

    let [startBlock, endBlock] = [0, 0];
    const { apiUrl, apiToken } = etherscanInfo;

    try {
      startBlock = await getBlockFromEtherscan(apiUrl, startTime, apiToken);
      endBlock = await getBlockFromEtherscan(apiUrl, endTime, apiToken);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(`Failed to get start and end blocks`);
      console.log(`${e}`);
      console.log(`${e.toString()}`);
      continue;
    }

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
          endBlock,
          etherscanInfo
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(`Failed to pull tx list for timelock: ${nickname}`);
        console.log(`${e}`);
        console.log(`${e.toString()}`);
        // may not need if array above stays empty after call fails
        continue;
      }

      // 2. Build display objects
      const transactionUrls: TimelockTransactionDisplayInfo[] =
        buildTimelockTransactionDisplayInfoFromTransaction(
          transactionList,
          etherscanInfo,
          nickname,
          chain
        );

      pushArray(allTimelockTransactionsSinceStartBlock, transactionUrls);

      // done with work on a particular timelock
    }

    // done with work on all timelocks on a chain
  }

  // done with work on all timelocks on all chain

  // sort all transactions by blockNumber asc
  const sortedTransactions: TimelockTransactionDisplayInfo[] =
    allTimelockTransactionsSinceStartBlock.sort((first, second) => {
      const ret = parseInt(first.blockNumber) - parseInt(second.blockNumber);
      return ret;
    });

  return sortedTransactions;
};
