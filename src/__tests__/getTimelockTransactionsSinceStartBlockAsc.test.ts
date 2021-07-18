import { getTimelockTransactionsSinceStartBlockAsc } from "../driver/helpers/getTimelockTransactionsSinceStartBlockAsc";

describe("getTimelockTransactionsSinceStartBlockAsc", () => {
  test("Runs", async (done) => {
    const transactions = await getTimelockTransactionsSinceStartBlockAsc();
    expect(transactions.length).toBeGreaterThan(0);
    done();
  });
});
