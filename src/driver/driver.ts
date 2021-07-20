import { TextChannel } from "discord.js";
import * as State from "../state/state";
import { getIndex } from "../state/state";
import { getTimelockTransactionsInTimeRangeAsc } from "./helpers/getTimelockTransactionsSinceStartBlockAsc";
import { getUtcSecondsFromDate } from "./helpers/getUtcSecondsFromDate";
import { notifyOfTimelockTransactions } from "./helpers/notifyOfTimelockTransactions";

export const driver = async (channel: TextChannel): Promise<void> => {
  while (State.getIsRunning()) {
    const pollingInterval = State.getPollingInterval();

    await loop(channel);

    await sleep(pollingInterval);
  }
};

export const loop = async (channel: TextChannel): Promise<void> => {
  const endBuffer = 60 * 10; // 10 min buffer
  const startTime = getIndex();
  const endTime = getUtcSecondsFromDate(new Date()) - endBuffer;
  const transactions = await getTimelockTransactionsInTimeRangeAsc(
    startTime,
    endTime
  );
  notifyOfTimelockTransactions(channel, transactions);
  State.setIndex(endTime);
};

const sleep = async (hours: number) => {
  const ms = hoursToMs(hours);
  return new Promise((r) => setTimeout(r as any, ms));
};

const hoursToMs = (hours: number) => {
  const ms = hours * 60 * 60 * 1000;
  return ms;
};
