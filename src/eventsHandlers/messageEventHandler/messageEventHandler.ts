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
  if (
    devRoleId !== undefined &&
    message.member?.roles.cache.has(devRoleId) === false
  ) {
    message.channel.send("Only Devs can send commands to bot");
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
