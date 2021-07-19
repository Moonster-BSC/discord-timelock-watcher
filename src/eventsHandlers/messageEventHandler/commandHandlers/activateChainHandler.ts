import { ChainId } from "blockchain-addressbook";
import { MessageArgumentReader } from "discord-command-parser";
import { setIsChainTracked } from "../../../state/state";
import { SupportedChainId } from "../../../types";

export const activateChainHandler = (reader: MessageArgumentReader): void => {
  // format is !activate <chainid> Chain id is nickname, not number
  const chainId = reader.getString();

  // should be chainId in a supported chain id map, but this doesn't exist yet.
  if (chainId === null || chainId in ChainId === false) {
    return;
  }

  setIsChainTracked(chainId as unknown as SupportedChainId, true);
};
