import Discord from "discord.js";
import { TimelockTransactionDisplayInfo } from "../../types/timelockTransactionDisplayInfo";
import { buildStringMessageFromDisplayInfos } from "./buildStringMessageFromDisplayInfos";

export const notifyOfTimelockTransactions = (
  channel: Discord.TextChannel,
  transactions: TimelockTransactionDisplayInfo[]
): void => {
  // for debug
  // const messages: string[] = [
  //   buildStringMessageFromDisplayInfos(transactions)[0],
  // ] as string[];
  const messages = buildStringMessageFromDisplayInfos(transactions);

  for (const message of messages) {
    // want to do one each instead of one message, to be able to mention a single tx better. Can be turned into one message if spammy
    channel.send(message);
  }
};
