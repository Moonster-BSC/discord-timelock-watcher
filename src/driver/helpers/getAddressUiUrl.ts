export const getAddressUiUrl = (scanUrl: string, address: string): string => {
  const txUrl = `<https://${scanUrl}/address/${address}>`;
  return txUrl;
};
