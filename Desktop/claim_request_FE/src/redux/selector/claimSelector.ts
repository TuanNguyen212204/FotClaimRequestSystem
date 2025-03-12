import { RootState } from "..";
export const selectAllClaim = (state: RootState) => state.claim.data;
export const selectAppovedClaim = (state: RootState) =>
  state.claim.listClaimApproved;
