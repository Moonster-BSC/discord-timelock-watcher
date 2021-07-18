import fetch from "node-fetch";
import { EtherscanInfo } from "./etherscanApiUrlMap";

export const getTransactionList = async (
  address: string,
  startBlock: number,
  etherscanInfo: EtherscanInfo
) => {
  const { url, apiToken } = etherscanInfo;
  const apiRoute = `/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&sort=asc&apikey=${apiToken}`;
  const fullUrl = `${url}${apiRoute}`;
  const resp = await fetch(fullUrl);
  const json: BlockApiResponse = await resp.json();
  return json.result;
};
