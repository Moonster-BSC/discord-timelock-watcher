import { buildStringMessageFromDisplayInfos } from "../driver/helpers/buildStringMessageFromDisplayInfos";
import { getTimelockTransactionsInTimeRangeAsc } from "../driver/helpers/getTimelockTransactionsSinceStartBlockAsc";
import { getUtcSecondsFromDate } from "../driver/helpers/getUtcSecondsFromDate";
import * as State from "../state/state";

describe("getTimelockTransactionsSinceStartBlockAsc", () => {
  test("Runs", async () => {
    const endBuffer = 60 * 10; // 10 min buffer
    const startTime = State.initIndex;
    const endTime = getUtcSecondsFromDate(new Date()) - endBuffer;
    const transactions = await getTimelockTransactionsInTimeRangeAsc(
      startTime,
      endTime
    );
    const messages = buildStringMessageFromDisplayInfos(transactions);
    expect(messages.length).toBeGreaterThan(0);
  });
});
