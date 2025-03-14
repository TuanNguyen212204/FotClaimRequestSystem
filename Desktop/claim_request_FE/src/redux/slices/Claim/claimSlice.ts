import { createSlice } from "@reduxjs/toolkit";
import { Claim, ClaimFinance } from "@/types/Claim";

import {
  fetchAllClaimAsync,
  fetchApprovedClaimsApproverAsync,
  fetchAllPendingClaimAsync,
  fetchClaimByUserAsync,
  fetchApprovedClaimsFinanceAsync,
} from "@/redux/thunk/Claim/claimThunk";

const initialState: {
  data: Claim[];
  listClaimApprovedApprover: Claim[];
  listClaimApprovedFiance: ClaimFinance[];
  myClaim: Claim[];
  listClaimPending: Claim[];
  totalPages: number;
  status: string;
  error: string | null;
} = {
  data: [],
  listClaimApprovedApprover: [],
  listClaimApprovedFiance: [],
  listClaimPending: [],
  totalPages: 1,
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
        state.listClaimApprovedApprover = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchApprovedClaimsApproverAsync.pending, (state) => {
        state.status = "loading";
      })
      //---------------------------------------------- Approved Claims for Finance -----------------------------------------------------
      .addCase(fetchApprovedClaimsFinanceAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchApprovedClaimsFinanceAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.listClaimApprovedFiance = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchApprovedClaimsFinanceAsync.pending, (state) => {
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
      })

      //---------------------------------------------- Pending Claims for Approver -----------------------------------------------------

      //---------------------------------------------- Pending Claims for Approver -----------------------------------------------------
      .addCase(fetchAllPendingClaimAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchAllPendingClaimAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.listClaimPending = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllPendingClaimAsync.pending, (state) => {
        state.status = "loading";
      });
  },
});
export default claimSlice.reducer;
