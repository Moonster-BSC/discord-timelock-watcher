import { SupportedChainId } from "./supportedChains";
import { TimelockStateInfo } from "./timelockStateInfo";

export type TimelockMap = Record<
  SupportedChainId,
  Record<string, TimelockStateInfo>
>;
