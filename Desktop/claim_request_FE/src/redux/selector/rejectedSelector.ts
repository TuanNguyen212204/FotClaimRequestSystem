import { RootState } from "..";
export const selectAllClaim = (state: RootState) => state.claim.data;
export const selectAllRejected = (state: RootState) =>
  state.claim.listClaimRejected;
export const selectAllRejectedTotalPages = (state: RootState) =>
  state.claim.totalPages;
