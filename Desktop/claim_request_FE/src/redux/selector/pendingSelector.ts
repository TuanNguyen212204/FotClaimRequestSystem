import { RootState } from "..";

export const selectAllClaim = (state: RootState) => state.claim.data;
export const selectAllPending = (state: RootState) => state.claim.listClaimPending;