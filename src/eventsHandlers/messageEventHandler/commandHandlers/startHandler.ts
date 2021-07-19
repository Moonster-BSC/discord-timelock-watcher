import { MessageArgumentReader } from "discord-command-parser";
import { setIsRunning } from "../../../state/state";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const startHandler = (_reader: MessageArgumentReader): void => {
  setIsRunning(true);
};
