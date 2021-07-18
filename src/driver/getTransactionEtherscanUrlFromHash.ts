export const getTransactionEtherscanUrlFromHash = (
  scanUrl: string,
  txHash: string
): string => {
  const txUrl = `${scanUrl}/tx/${txHash}`;
  return txUrl;
};
