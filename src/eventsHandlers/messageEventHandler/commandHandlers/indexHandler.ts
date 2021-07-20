import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { getIndex } from "../../../state/state";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const indexHandler = (
  _reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  const index = getIndex();

  const message = `Last refresh at timestamp: ${index}`;
  channel.send(message);
};
