import Discord from "discord.js";
import { messageEventHandler } from "./eventsHandlers/messageEventHandler/messageEventHandler";
const bot = new Discord.Client();

export type BotEvents = Extract<keyof Discord.ClientEvents, "message">;

import dotenv from "dotenv";
dotenv.config();

// so we easily know what events are implemented
const botEventNames: Record<BotEvents, BotEvents> = {
  message: "message",
};

// TODO: type to event handler type
const eventHandlerMap: Record<BotEvents, any> = {
  message: messageEventHandler,
};

bot.on(botEventNames.message, eventHandlerMap[botEventNames.message]);

const token = process.env["token"];

bot.login(token);
