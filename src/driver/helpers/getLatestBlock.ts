import fetch from "node-fetch";
import { BlockResponse } from "../../types/etherscanApi/BlockResponse";

export const getBlockFromEtherscan = async (
  scanUrl: string,
  timestamp: number,
  apiToken?: string
): Promise<number> => {
  const token = apiToken ? apiToken : "YourApiKeyToken";
  const url = `${scanUrl}/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=after&apikey=${token}`;
  const resp = await fetch(url);
  const json: BlockResponse = await resp.json();
  const block = parseInt(json.result);
  return block;
};
