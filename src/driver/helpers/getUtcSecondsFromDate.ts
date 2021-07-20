export const getUtcSecondsFromDate = (date: Date): number =>
  Math.floor(date.getTime() / 1000);
