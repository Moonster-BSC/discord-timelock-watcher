import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { getPollingInterval } from "../../../state/state";

export const setIntervalHandler = (
  reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  // format is !interval <number in hours>
  const interval = reader.getInt();

  // should be chainId in a supported chain id map, but this doesn't exist yet.
  if (interval) {
    return;
  }

  getPollingInterval;

  const message = `Set refresh interval to ${interval}`;
  channel.send(message);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getIntervalHandler = (
  _reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  const pollingInterval = getPollingInterval();
  const message = `Refresh interval is set to ${pollingInterval} hours`;
  channel.send(message);
};
