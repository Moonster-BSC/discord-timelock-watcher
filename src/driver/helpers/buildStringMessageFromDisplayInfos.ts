import { TimelockTransactionDisplayInfo } from "../../types/timelockTransactionDisplayInfo";

const buildStringMessageFromDisplayInfo = (
  timelockTransactionDisplayInfo: TimelockTransactionDisplayInfo
): string => {
  const {
    transactionUiUrl,
    timelockNickname,
    chainId,
    blockNumber,
    timeStamp,
    from,
  } = timelockTransactionDisplayInfo;

  const message = `
        A transaction from **${timelockNickname}** on ${chainId} has appeared...

        Transaction Url: ${transactionUiUrl}
        Block: ${blockNumber}
        TimeStamp: ${timeStamp}
        Transaction sender: ${from}
    `;

  return message;
};

// on array
export const buildStringMessageFromDisplayInfos = (
  timelockTransactionDisplayInfos: TimelockTransactionDisplayInfo[]
): string[] => {
  return timelockTransactionDisplayInfos.map(buildStringMessageFromDisplayInfo);
};
