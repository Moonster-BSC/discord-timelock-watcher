import { ChainId } from "blockchain-addressbook";
import { MessageArgumentReader } from "discord-command-parser";
import { setIsRunning } from "../../../state/state";

export const listHandler = (reader: MessageArgumentReader): void => {
  // format is !list <chainid> Chain id is nickname, not number
  const chainId = reader.getString();

  // should be chainId in a supported chain id map, but this doesn't exist yet.
  if (chainId === null || chainId in ChainId === false) {
    return;
  }
};
