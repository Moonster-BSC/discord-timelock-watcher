import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { listChainTimelocks } from "../../../state/state";
import { TimelockStateInfo } from "../../../types/timelockStateInfo";
import {
  SupportedChainId,
  supportedChains,
} from "../../../types/supportedChains";
import { getAddressUiUrl } from "../../../driver/helpers/getAddressUiUrl";
import { etherscanApiUrlMap } from "../../../data/etherscanApiUrlMap";

export const listHandler = (
  reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  // format is !list <chainid> Chain id is nickname, not number
  const chainId = reader.getString();

  // should be chainId in a supported chain id map, but this doesn't exist yet.
  if (chainId === null || chainId in supportedChains === false) {
    return;
  }

  const timelockInfoList = listChainTimelocks(chainId as SupportedChainId);

  const timelockListMessage: string =
    buildMessagesFromTimelockInfo(timelockInfoList);

  // careful, sending potentially long message to channel
  channel.send(timelockListMessage);
};

// helpers

const buildMessageFromTimelockInfo = (info: TimelockStateInfo) => {
  const { nickname, address, chainId } = info;
  const { uiUrl } = etherscanApiUrlMap[chainId];
  const url = getAddressUiUrl(uiUrl, address);
  const message = `**${nickname}**
${url}`;
  return message;
};

const buildMessagesFromTimelockInfo = (infos: TimelockStateInfo[]) => {
  let fullMessage = "";
  infos.forEach((info) => {
    const message = buildMessageFromTimelockInfo(info);
    fullMessage = `${fullMessage}

${message}`;
  });
  return fullMessage;
};
