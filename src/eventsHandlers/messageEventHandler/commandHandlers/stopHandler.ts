import { MessageArgumentReader } from "discord-command-parser";
import { setIsRunning } from "../../../state/state";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stopHandler = (_reader: MessageArgumentReader): void => {
  setIsRunning(false);

  const message = `Stopped bot`;
  channel.send(message);
};
