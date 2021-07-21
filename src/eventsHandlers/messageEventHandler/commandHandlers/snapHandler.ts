import Discord from "discord.js";
import * as State from "../../../state/state";
import { MessageArgumentReader } from "discord-command-parser";
import { snapTimelockMap } from "../../../snapshotter/snapTimelockMap";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const snapHandler = (
  _reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  const index = State.getIndex();
  const timelockMap = State.getTimelockMap();
  snapTimelockMap(timelockMap, index);

  const message = `Snapshot taken at index: ${index}`;
  channel.send(message);
};
