// const getUTCSeconds = (date: Date): number =>
//   Math.floor(Number(date) / 1000);

// const getNowInUTCSeconds = () => Date.now()

const getBlockFromEtherscan = async (
  scanUrl: string,
  timestamp: number,
  apiToken?: string
) => {
  const token = apiToken ? apiToken : "YourApiKeyToken";
  const url = `${scanUrl}/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=after&apikey=${token}`;
  const resp = await fetch(url);
  const json: BlockApiResponse = await resp.json();
  return json.result;
};
