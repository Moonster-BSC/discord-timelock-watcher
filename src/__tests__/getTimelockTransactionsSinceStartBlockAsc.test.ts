import { buildStringMessageFromDisplayInfos } from "../driver/helpers/buildStringMessageFromDisplayInfos";
import { getTimelockTransactionsSinceStartBlockAsc } from "../driver/helpers/getTimelockTransactionsSinceStartBlockAsc";
import * as State from "../state/state";

describe("getTimelockTransactionsSinceStartBlockAsc", () => {
  test("Runs", async () => {
    const startBlock = 16295567;
    State.setBlockIndex(startBlock);
    const transactions = await getTimelockTransactionsSinceStartBlockAsc();
    const messages = buildStringMessageFromDisplayInfos(transactions);
    expect(messages.length).toBeGreaterThan(0);
  });
});
