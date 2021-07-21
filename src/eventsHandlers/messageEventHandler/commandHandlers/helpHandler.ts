import Discord from "discord.js";
import { MessageArgumentReader } from "discord-command-parser";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const helpHandler = (
  _reader: MessageArgumentReader,
  channel: Discord.TextChannel
): void => {
  const message = `Commands:

!add <timelockNickname> <address> <chainName>
!remove <timelockNickname> <chainName>
!activate <chainName>
!pause <chainName>
!stop
!start
!list <chainName>
!index 
!setIndex <newIndex>
!interval
!setInterval <newInterval>
!snap
!help

`;
  channel.send(message);
};
