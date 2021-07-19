import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { setIsRunning } from "../../../state/state";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stopHandler = (
  _reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  setIsRunning(false);

  const message = `Stopped bot`;
  channel.send(message);
};
