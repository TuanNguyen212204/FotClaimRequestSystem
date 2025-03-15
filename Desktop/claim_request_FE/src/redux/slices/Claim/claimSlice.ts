import { createSlice } from "@reduxjs/toolkit";
import { Claim, ClaimFinance, DetailClaimFinance } from "@/types/Claim";

import {
  fetchAllClaimAsync,
  fetchApprovedClaimsApproverAsync,
  fetchAllPendingClaimAsync,
  fetchClaimByUserAsync,
  fetchApprovedClaimsFinanceAsync,
  fetchApprovedDetailFinanceAsync,
  fetchClaimByUserWithRejectStatusAsync,
  fetchClaimByUserWithPendingStatusAsync,
  fetchClaimByUserWithApprovedStatusAsync,
} from "@/redux/thunk/Claim/claimThunk";

const initialState: {
  data: Claim[];
  listClaimApprovedApprover: Claim[];
  listClaimApprovedFiance: ClaimFinance[];
  listDetailClaimApprovedFiance: DetailClaimFinance[];
  myClaim: Claim[];
  listClaimPending: Claim[];
  totalPages: number;
  listClaimUserApproved: Claim[];
  listClaimUserPending: Claim[];
  listClaimUserRejected: Claim[];
  status: string;
  error: string | null;
} = {
  data: [],
  listClaimApprovedApprover: [],
  listClaimApprovedFiance: [],
  listDetailClaimApprovedFiance: [],
  listClaimPending: [],
  listClaimUserApproved: [],
  listClaimUserPending: [],
  listClaimUserRejected: [],
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
      //fetch all approved claim with role is Approver
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
      //---------------------------------------------- Approved Detail for Finance -----------------------------------------------------
      .addCase(fetchApprovedDetailFinanceAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchApprovedDetailFinanceAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.listDetailClaimApprovedFiance = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchApprovedDetailFinanceAsync.pending, (state) => {
        state.status = "loading";
      })
      //---------------------------------------------- My Claims -----------------------------------------------------
      //fetch all claim by user_id
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

      //fetch all pending claim with role is Approver
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
      })
      //my claim is with approved status
      .addCase(
        fetchClaimByUserWithApprovedStatusAsync.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = String(action.error.message);
        }
      )
      .addCase(
        fetchClaimByUserWithApprovedStatusAsync.fulfilled,
        (state, action) => {
          state.status = "success";
          state.listClaimUserApproved = action.payload;
        }
      )
      .addCase(fetchClaimByUserWithApprovedStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      //my claim is with pending status
      .addCase(
        fetchClaimByUserWithPendingStatusAsync.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = String(action.error.message);
        }
      )
      .addCase(fetchClaimByUserWithPendingStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchClaimByUserWithPendingStatusAsync.fulfilled,
        (state, action) => {
          state.status = "success";
          state.listClaimUserPending = action.payload;
        }
      )
      //my claim is with rejected status
      .addCase(
        fetchClaimByUserWithRejectStatusAsync.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = String(action.error.message);
        }
      )
      .addCase(fetchClaimByUserWithRejectStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchClaimByUserWithRejectStatusAsync.fulfilled,
        (state, action) => {
          state.status = "success";
          state.listClaimUserRejected = action.payload;
        }
      );
  },
});
export default claimSlice.reducer;
