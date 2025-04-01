import { RootState } from "..";
export const selectAllClaim = (state: RootState) => state.claim.data;
export const selectAllDraft = (state: RootState) => state.claim.listClaimDraft;
export const selectAllDraftTotalPages = (state: RootState) => state.claim.totalPages;