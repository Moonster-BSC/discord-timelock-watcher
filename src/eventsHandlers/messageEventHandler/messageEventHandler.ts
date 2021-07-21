import { parse, ParsedMessage, ParserOptions } from "discord-command-parser";
import Discord from "discord.js";
import { BotCommands, commandMap } from "./commandMap";

import dotenv from "dotenv";
dotenv.config();

const parserOptions: ParserOptions = {
  allowBots: false,
  allowSpaceBeforeCommand: true,
  ignorePrefixCase: false,
};

const commandPrefix = "!";

// toto get spy role id
// const spyRoleId = "123456789";

export const messageEventHandler = (message: Discord.Message): void => {
  const devRoleId = process.env["dev_role_id"];
  const beefyOgRoleId = process.env["beefyog_role_id"]; // TODO move this to config file and make it array of roles

  const isTimelockChannel = "867425212554543104";
  if (
    devRoleId !== undefined &&
    beefyOgRoleId != undefined &&
    message.channel.id === isTimelockChannel &&
    message.member?.roles.cache.has(devRoleId) === false
  ) {
    // For some reason this gets sent like 10 times on my server. Not sure why this method is called so many times, maybe theres built in retry and the return statement is incorrect
    // message.channel.send("Only Devs can send commands to bot");
    return;
  }

  const parsed: ParsedMessage<Discord.Message> = parse(
    message,
    commandPrefix,
    parserOptions
  );

  if (!parsed.success) return;

  const { command, reader } = parsed;

  // check which command

  if (command in commandMap === false) {
    return;
  }

  const commandHandler = commandMap[command as BotCommands];

  // run command
  commandHandler(reader, message.channel as Discord.TextChannel);
};
