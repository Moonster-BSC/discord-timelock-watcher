import Discord from "discord.js";

import { ChainId } from "blockchain-addressbook";
import { MessageArgumentReader } from "discord-command-parser";
import { listChainTimelocks } from "../../../state/state";
import { SupportedChainId } from "../../../types";
import { TimelockStateInfo } from "../../../types/timelockStateInfo";

export const listHandler = (
  reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  // format is !list <chainid> Chain id is nickname, not number
  const chainId = reader.getString();

  // should be chainId in a supported chain id map, but this doesn't exist yet.
  if (chainId === null || chainId in ChainId === false) {
    return;
  }

  const timelockInfoList = listChainTimelocks(
    chainId as unknown as SupportedChainId
  );

  const timelockListMessage: string =
    buildMessagesFromTimelockInfo(timelockInfoList);

  // careful, sending potentially long message to channel
  channel.send(timelockListMessage);
};

// helpers

const buildMessageFromTimelockInfo = (info: TimelockStateInfo) => {
  const { nickname, address } = info;
  const message = `
**${nickname}**
address: ${address}

`;
  return message;
};

const buildMessagesFromTimelockInfo = (infos: TimelockStateInfo[]) => {
  let fullMessage = "";
  infos.forEach((info) => {
    const message = buildMessageFromTimelockInfo(info);
    fullMessage = `
${fullMessage}

${message}
`;
  });
  return fullMessage;
};
