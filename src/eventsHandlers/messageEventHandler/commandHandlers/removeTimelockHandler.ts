import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { removeTimelock } from "../../../state/state";
import {
  SupportedChainId,
  supportedChains,
} from "../../../types/supportedChains";

export const removeTimelockHandler = (
  reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  // format is !remove <name> <chainid> Chain id is nickname, not number
  const nickname = reader.getString();
  const chainId = reader.getString();

  // should be chainId in a supported chain id map, but this doesn't exist yet.
  if (
    nickname === null ||
    chainId === null ||
    chainId in supportedChains === false
  ) {
    return;
  }

  removeTimelock(chainId as SupportedChainId, nickname);

  const successMessage = `Removed timelock: ${nickname} on chain: ${chainId}`;
  channel.send(successMessage);
};
