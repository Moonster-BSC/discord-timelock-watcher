import Discord from "discord.js";

import { ChainId } from "blockchain-addressbook";
import { MessageArgumentReader } from "discord-command-parser";
import { addTimelockToMap } from "../../../state/state";
import { SupportedChainId } from "../../../types";
import { TimelockStateInfo } from "../../../types/timelockStateInfo";

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
    chainId in ChainId === false
  ) {
    return;
  }

  const timelockToTrack: TimelockStateInfo = {
    nickname,
    address,
    chainId: chainId as unknown as SupportedChainId, // due to missing SupportedChainId map, need to cast to unknown here
    isActivelyWatched: true,
  };

  addTimelockToMap(timelockToTrack);

  const successMessage = `Tracking timelock: ${nickname} on chain: ${chainId}`;
  channel.send(successMessage);
};
