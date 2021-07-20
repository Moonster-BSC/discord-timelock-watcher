import fetch from "node-fetch";
import {
  ListAccountTransactionsResponse,
  Transaction,
} from "../types/etherscanApi/ListAccountTransactionsResponse";
import { EtherscanInfo } from "./etherscanApiUrlMap";

export const getTransactionList = async (
  address: string,
  startBlock: number,
  endBlock: number,
  etherscanInfo: EtherscanInfo
  // returns string when rate limited
): Promise<Transaction[] | string> => {
  const { apiUrl: url, apiToken } = etherscanInfo;
  const apiRoute = `/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endBlock=${endBlock}&sort=asc&apikey=${apiToken}`;
  const fullUrl = `${url}${apiRoute}`;
  const resp = await fetch(fullUrl);
  const json: ListAccountTransactionsResponse = await resp.json();
  return json.result;
};
