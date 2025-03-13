import { RootState } from "..";
export const selectAllClaim = (state: RootState) => state.claim.data;
export const selectAppovedClaim = (state: RootState) =>
  state.claim.listClaimApproved;
export const selectMyClaim = (state: RootState) => state.claim.myClaim;
export const selectApprovedClaimTotalPages = (state: RootState) =>
  state.claim.totalPages;
