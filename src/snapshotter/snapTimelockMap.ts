import { TimelockMap } from "../types/timelockMap";
import { promises as fs } from "fs";
import { getIndex } from "../state/state";

// dumps timelock map to json
export const snapTimelockMap = async (
  timelockMap: TimelockMap
): Promise<void> => {
  const jsonStr = JSON.stringify(timelockMap);
  const logPath = "./log";
  const index = getIndex();
  const filename = `timelocks_at_${index}.log`;
  const fullFilename = `${logPath}/${filename}`;
  await fs.writeFile(fullFilename, jsonStr);
  console.log(`Wrote timelocks as of ${index} to ${fullFilename}`);
};
