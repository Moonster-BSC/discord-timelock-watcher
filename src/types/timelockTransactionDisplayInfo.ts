import { SupportedChainId } from ".";
import { Transaction } from "./etherscanApi/ListAccountTransactionsResponse";

type TransactionPropertiesToDisplay = Pick<
  Transaction,
  "blockNumber" | "timeStamp" | "from"
>;

export interface TimelockTransactionDisplayInfo
  extends TransactionPropertiesToDisplay {
  transactionUiUrl: string;
  timelockNickname: string;
  chainId: SupportedChainId;
}