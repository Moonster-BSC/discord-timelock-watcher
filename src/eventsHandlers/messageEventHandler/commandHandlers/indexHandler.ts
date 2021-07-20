import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { getIndex, setIndex } from "../../../state/state";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const indexHandler = (
  _reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  const index = getIndex();

  const message = `Last refresh at timestamp: ${index}`;
  channel.send(message);
};

export const setIndexHandler = (
  reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  // format is !interval <number in hours>
  const index = reader.getInt();

  if (!index) {
    return;
  }

  setIndex(index);

  const message = `Index now set to: ${index}`;
  channel.send(message);
};
