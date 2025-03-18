import { RootState } from "..";
export const selectAllClaim = (state: RootState) => state.claim.data;
export const selectAppovedClaim = (state: RootState) =>
  state.claim.listClaimApproved;
export const selectMyClaim = (state: RootState) => state.claim.myClaim;
export const selectApprovedClaimTotalPages = (state: RootState) =>
  state.claim.totalPages;
export const selectApprovedClaimByUserID = (state: RootState) =>
  state.claim.listClaimUserApproved;
export const selectPendingClaimByUserID = (state: RootState) =>
  state.claim.listClaimUserPending;
export const selectRejectedClaimByUserID = (state: RootState) =>
  state.claim.listClaimUserRejected;
export const selectDraftClaimByUserID = (state: RootState) =>
  state.claim.listClaimUserDraft;
