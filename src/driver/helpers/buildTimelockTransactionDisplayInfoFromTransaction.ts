import { EtherscanInfo } from "../../data/etherscanApiUrlMap";
import { Transaction } from "../../types/etherscanApi/ListAccountTransactionsResponse";
import { SupportedChainId } from "../../types/supportedChains";
import { TimelockTransactionDisplayInfo } from "../../types/timelockTransactionDisplayInfo";

export const buildTimelockTransactionDisplayInfoFromTransaction = (
  transactionList: Transaction[],
  etherscanInfo: EtherscanInfo,
  timelockNickname: string,
  chainId: SupportedChainId
): TimelockTransactionDisplayInfo[] => {
  const ret: TimelockTransactionDisplayInfo[] = transactionList.map((tx) => {
    const { hash, blockNumber, timeStamp, from } = tx;

    const transactionUiUrl = getTransactionUiUrlFromHash(
      etherscanInfo.uiUrl,
      hash
    );

    const timelockTransactionDisplayInfo: TimelockTransactionDisplayInfo = {
      transactionUiUrl,
      timelockNickname,
      chainId,
      blockNumber,
      timeStamp,
      from,
    };
    return timelockTransactionDisplayInfo;
  });
  return ret;
};

export const getTransactionUiUrlFromHash = (
  scanUrl: string,
  txHash: string
): string => {
  const txUrl = `<https://${scanUrl}/tx/${txHash}>`;
  return txUrl;
};
