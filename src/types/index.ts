// globally helpful/overriden types
import { ChainId } from "blockchain-addressbook";

export type SupportedChainId = Exclude<ChainId, ChainId.avax>;
