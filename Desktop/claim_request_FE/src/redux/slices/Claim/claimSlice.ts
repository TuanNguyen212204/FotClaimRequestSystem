import { createSlice } from "@reduxjs/toolkit";
import { Claim } from "@/types/Claim";

import {
  fetchAllClaimAsync,
  fetchApprovedClaimsApproverAsync,
  fetchClaimByUserAsync,
} from "@/redux/thunk/Claim/claimThunk";

const initialState: {
  data: Claim[];
  listClaimApproved: Claim[];
  myClaim: Claim[];
  status: string;
  error: string | null;
} = {
  data: [],
  listClaimApproved: [],
  myClaim: [],

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
        state.listClaimApproved = action.payload;
      })
      .addCase(fetchApprovedClaimsApproverAsync.pending, (state) => {
        state.status = "loading";
      })
      //---------------------------------------------- My Claims -----------------------------------------------------
      .addCase(fetchClaimByUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchClaimByUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.myClaim = action.payload;
      })
      .addCase(fetchClaimByUserAsync.pending, (state) => {
        state.status = "loading";
      });
  },
});
export default claimSlice.reducer;
