import Discord from "discord.js";

import { MessageArgumentReader } from "discord-command-parser";
import { activateChainHandler } from "./commandHandlers/activateChainHandler";
import { addTimelockHandler } from "./commandHandlers/addTimelockHandler";
import { stopHandler } from "./commandHandlers/stopHandler";
import { listHandler } from "./commandHandlers/listHandler";
import { pauseChainHandler } from "./commandHandlers/pauseChainHandler";
import { removeTimelockHandler } from "./commandHandlers/removeTimelockHandler";
import { startHandler } from "./commandHandlers/startHandler";
import { indexHandler } from "./commandHandlers/indexHandler";
import {
  setIntervalHandler,
  getIntervalHandler,
} from "./commandHandlers/intervalHandler";

export enum BotCommands {
  AddTimelock = "add",
  RemoveTimelock = "remove",
  ActivateChain = "activate",
  PauseChain = "pause",
  Stop = "stop",
  Start = "start",
  List = "list",
  Index = "index",
  Interval = "interval",
  UpdateInterval = "updateInterval",
}

export type BotCommandHandler = (
  reader: MessageArgumentReader,
  channel: Discord.TextChannel
) => void;

// any is really for any commandHandler function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandMap: Record<BotCommands, BotCommandHandler> = {
  [BotCommands.AddTimelock]: addTimelockHandler,
  [BotCommands.RemoveTimelock]: removeTimelockHandler,
  [BotCommands.ActivateChain]: activateChainHandler,
  [BotCommands.PauseChain]: pauseChainHandler,
  [BotCommands.Stop]: stopHandler,
  [BotCommands.Start]: startHandler,
  [BotCommands.List]: listHandler,
  [BotCommands.Index]: indexHandler,
  [BotCommands.Interval]: setIntervalHandler,
  [BotCommands.UpdateInterval]: getIntervalHandler,
};
