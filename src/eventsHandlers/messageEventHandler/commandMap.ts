import { MessageArgumentReader } from "discord-command-parser";
import { addTimelockHandler } from "./commandHandlers/addTimelockHandler";

export enum BotCommands {
  AddTimelock = "add",
  RemoveTimelock = "remove",
  ActivateChain = "activate",
  PauseChain = "pause",
  Halt = "halt",
  Start = "start",
}

type BotCommandHandler = (reader: MessageArgumentReader) => void;

// any is really for any commandHandler function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandMap: Record<BotCommands, BotCommandHandler> = {
  [BotCommands.AddTimelock]: addTimelockHandler,
  [BotCommands.RemoveTimelock]: addTimelockHandler,
  [BotCommands.ActivateChain]: addTimelockHandler,
  [BotCommands.PauseChain]: addTimelockHandler,
  [BotCommands.Halt]: addTimelockHandler,
  [BotCommands.Start]: addTimelockHandler,
};
