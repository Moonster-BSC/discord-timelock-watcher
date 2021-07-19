import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { setIsRunning } from "../../../state/state";
import { driver } from "../../../driver/driver";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const startHandler = (
  _reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  setIsRunning(true);

  driver(channel);

  const message = `Started bot`;
  channel.send(message);
};
