import { Transaction } from "./etherscanApi/ListAccountTransactionsResponse";
import { SupportedChainId } from "./supportedChains";

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
