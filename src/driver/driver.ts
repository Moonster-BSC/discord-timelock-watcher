import { TextChannel } from "discord.js";
import * as State from "../state/state";
import { getTimelockTransactionsInBlockRangeAsc } from "./helpers/getTimelockTransactionsSinceStartBlockAsc";
import { notifyOfTimelockTransactions } from "./helpers/notifyOfTimelockTransactions";

export const driver = async (channel: TextChannel): Promise<void> => {
  while (State.getIsRunning()) {
    const pollingInterval = State.getPollingInterval();

    loop(channel);

    await sleep(pollingInterval);
  }
};

export const loop = async (channel: TextChannel): Promise<void> => {
  const transactions = await getTimelockTransactionsInBlockRangeAsc();
  notifyOfTimelockTransactions(channel, transactions);
  // TODO: get current block via api
  State.setBlockIndex(0);
};

const sleep = async (hours: number) => {
  const ms = hoursToMs(hours);
  return new Promise((r) => setTimeout(r as any, ms));
};

const hoursToMs = (hours: number) => {
  const ms = hours * 60 * 60 * 1000;
  return ms;
};
