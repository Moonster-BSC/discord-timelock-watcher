import Discord from "discord.js";
import { TimelockTransactionDisplayInfo } from "../../types/timelockTransactionDisplayInfo";
import { buildStringMessageFromDisplayInfos } from "./buildStringMessageFromDisplayInfos";

export const notifyOfTimelockTransactions = (
  channel: Discord.TextChannel,
  transactions: TimelockTransactionDisplayInfo[]
): void => {
  const messages = buildStringMessageFromDisplayInfos(transactions);
  for (const message of messages) {
    channel.send(message);
  }
};
