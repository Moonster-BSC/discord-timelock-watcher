import { buildStringMessageFromDisplayInfos } from "../driver/helpers/buildStringMessageFromDisplayInfos";
import { getTimelockTransactionsInTimeRangeAsc } from "../driver/helpers/getTimelockTransactionsSinceStartBlockAsc";
import * as State from "../state/state";

describe("getTimelockTransactionsSinceStartBlockAsc", () => {
  test("Runs", async () => {
    State.setIndex(State.initTimeAgo);
    const transactions = await getTimelockTransactionsInTimeRangeAsc();
    const messages = buildStringMessageFromDisplayInfos(transactions);
    expect(messages.length).toBeGreaterThan(0);
  });
});
