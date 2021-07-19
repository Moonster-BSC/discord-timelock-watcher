import { MessageArgumentReader } from "discord-command-parser";
import { addTimelockHandler } from "./commandHandlers/addTimelockHandler";
import { removeTimelockHandler } from "./commandHandlers/removeTimelockHandler";

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
  [BotCommands.ActivateChain]: addTimelockHandler,
  [BotCommands.PauseChain]: addTimelockHandler,
  [BotCommands.Halt]: addTimelockHandler,
  [BotCommands.Start]: addTimelockHandler,
};
