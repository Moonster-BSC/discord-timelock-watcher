import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { getBlockIndex } from "../../../state/state";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const blockHandler = (
  _reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  const block = getBlockIndex();

  const message = `Last refresh at block: ${block}`;
  channel.send(message);
};
