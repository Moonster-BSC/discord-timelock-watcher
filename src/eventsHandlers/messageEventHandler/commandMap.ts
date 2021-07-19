import { MessageArgumentReader } from "discord-command-parser";
import { activateChainHandler } from "./commandHandlers/activateChainHandler";
import { addTimelockHandler } from "./commandHandlers/addTimelockHandler";
import { haltHandler } from "./commandHandlers/haltHandler";
import { listHandler } from "./commandHandlers/listHandler";
import { pauseChainHandler } from "./commandHandlers/pauseChainHandler";
import { removeTimelockHandler } from "./commandHandlers/removeTimelockHandler";
import { startHandler } from "./commandHandlers/startHandler";

export enum BotCommands {
  AddTimelock = "add",
  RemoveTimelock = "remove",
  ActivateChain = "activate",
  PauseChain = "pause",
  Halt = "halt",
  Start = "start",
  List = "list",
}

type BotCommandHandler = (reader: MessageArgumentReader) => void;

// any is really for any commandHandler function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandMap: Record<BotCommands, BotCommandHandler> = {
  [BotCommands.AddTimelock]: addTimelockHandler,
  [BotCommands.RemoveTimelock]: removeTimelockHandler,
  [BotCommands.ActivateChain]: activateChainHandler,
  [BotCommands.PauseChain]: pauseChainHandler,
  [BotCommands.Halt]: haltHandler,
  [BotCommands.Start]: startHandler,
  [BotCommands.List]: listHandler,
};
