import { TimelockMap } from "../types/timelockMap";
import { promises as fs } from "fs";

// dumps timelock map to json
export const snapTimelockMap = async (
  timelockMap: TimelockMap,
  index: number
): Promise<void> => {
  const jsonStr = JSON.stringify(timelockMap);
  const logPath = "./log";
  const filename = `timelocks_at_${index}.json`;
  const fullFilename = `${logPath}/${filename}`;
  await fs.writeFile(fullFilename, jsonStr);
  console.log(`Wrote timelocks as of ${index} to ${fullFilename}`);
};
