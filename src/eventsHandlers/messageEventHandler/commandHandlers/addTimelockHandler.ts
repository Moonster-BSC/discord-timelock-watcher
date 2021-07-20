import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { addTimelockToMap } from "../../../state/state";
import { TimelockStateInfo } from "../../../types/timelockStateInfo";
import {
  SupportedChainId,
  supportedChains,
} from "../../../types/supportedChains";

export const addTimelockHandler = (
  reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  // format is !add <name> <address> <chainid> Chain id is nickname, not number
  const nickname = reader.getString();
  const address = reader.getString();
  const chainId = reader.getString();

  // should be chainId in a supported chain id map, but this doesn't exist yet.
  if (
    nickname === null ||
    address === null ||
    chainId === null ||
    chainId in supportedChains === false
  ) {
    return;
  }

  const timelockToTrack: TimelockStateInfo = {
    nickname,
    address,
    chainId: chainId as SupportedChainId,
    isActivelyWatched: true,
  };

  addTimelockToMap(timelockToTrack);

  const successMessage = `Tracking timelock: ${nickname} on chain: ${chainId}`;
  channel.send(successMessage);
};
