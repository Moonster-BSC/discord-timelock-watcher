import fetch from "node-fetch";
import { ListAccountTransactionsResponse } from "../types/etherscanApi/ListAccountTransactionsResponse";
import { EtherscanInfo } from "./etherscanApiUrlMap";

export const getTransactionList = async (
  address: string,
  startBlock: number,
  etherscanInfo: EtherscanInfo
) => {
  const { apiUrl: url, apiToken } = etherscanInfo;
  const apiRoute = `/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&sort=asc&apikey=${apiToken}`;
  const fullUrl = `${url}${apiRoute}`;
  const resp = await fetch(fullUrl);
  const json: ListAccountTransactionsResponse = await resp.json();
  return json.result;
};