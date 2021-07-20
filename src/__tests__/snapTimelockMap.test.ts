import { snapTimelockMap } from "../snapshotter/snapTimelockMap";
import { getInitTimelockMap } from "../state/getInitTimelockMap";

describe("snapTimelockMap", () => {
  test("Saves to file", async () => {
    const timelockMap = getInitTimelockMap();
    await snapTimelockMap(timelockMap);
  });
});
