import { RootState } from "..";
export const selectAllPending = (state: RootState) => state.claim.data;