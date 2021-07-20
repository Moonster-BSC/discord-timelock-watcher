import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { getIsRunning, setIsRunning } from "../../../state/state";
import { driver } from "../../../driver/driver";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const startHandler = (
  _reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  if (getIsRunning() === true) {
    const message = `Bot is already running`;
    channel.send(message);
    return;
  }

  setIsRunning(true);

  driver(channel);

  const message = `Started bot`;
  channel.send(message);
};
