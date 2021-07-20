import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { setIsChainTracked } from "../../../state/state";
import { BotCommandHandler } from "../commandMap";
import {
  SupportedChainId,
  supportedChains,
} from "../../../types/supportedChains";

export const activateChainHandler: BotCommandHandler = (
  reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  // format is !activate <chainid> Chain id is nickname, not number
  const chainId = reader.getString();

  // should be chainId in a supported chain id map, but this doesn't exist yet.
  if (chainId === null || chainId in supportedChains === false) {
    return;
  }

  setIsChainTracked(chainId as SupportedChainId, true);

  const message = `Started tracking chain: ${chainId}`;
  channel.send(message);
};
