import { createSlice } from "@reduxjs/toolkit";
import type { Claim } from "@/types/Claim.type";
import {
  fetchAllClaimAsync,
  fetchApprovedClaimsApproverAsync,
} from "@/redux/thunk/Claim/claimThunk";

const initialState: {
  data: Claim[];
  listClaimApproved: Claim[];
  totalPages: number;
  status: string;
  error: string | null;
} = {
  data: [],
  listClaimApproved: [],
  totalPages: 1,
  status: "",
  error: null,
};
export const claimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClaimAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchAllClaimAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllClaimAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      //---------------------------------------------- Approved Claims for Approver -----------------------------------------------------
      .addCase(fetchApprovedClaimsApproverAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchApprovedClaimsApproverAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.listClaimApproved = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchApprovedClaimsApproverAsync.pending, (state) => {
        state.status = "loading";
      });
  },
});
export default claimSlice.reducer;
