import { ChainId } from "blockchain-addressbook";
import { MessageArgumentReader } from "discord-command-parser";
import { removeTimelock } from "../../../state/state";
import { SupportedChainId } from "../../../types";

export const removeTimelockHandler = (reader: MessageArgumentReader): void => {
  // format is !remove <name> <chainid> Chain id is nickname, not number
  const nickname = reader.getString();
  const chainId = reader.getString();

  // should be chainId in a supported chain id map, but this doesn't exist yet.
  if (nickname === null || chainId === null || chainId in ChainId === false) {
    return;
  }

  removeTimelock(chainId as unknown as SupportedChainId, nickname);
};
