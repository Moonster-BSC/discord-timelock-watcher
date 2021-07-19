import { parse, ParsedMessage, ParserOptions } from "discord-command-parser";
import Discord from "discord.js";
import { BotCommands, commandMap } from "./commandMap";

const parserOptions: ParserOptions = {
  allowBots: false,
  allowSpaceBeforeCommand: true,
  ignorePrefixCase: false,
};

const commandPrefix = "!";

export const messageEventHandler = (message: Discord.Message): void => {
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
