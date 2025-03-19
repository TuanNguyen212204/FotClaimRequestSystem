import { createSlice } from "@reduxjs/toolkit";
import {
  Claim,
  DetailPendingClaim,
  PendingClaim,
  ApprovedClaim,
  RejectedClaim,
  ClaimFinance,
  DetailClaimFinance,
} from "@/types/Claim";

import {
  fetchAllClaimAsync,
  fetchApprovedClaimsApproverAsync,
  fetchAllPendingClaimAsync,
  fetchPendingClaimDetailAsync,
  fetchClaimByUserAsync,
  fetchClaimByUserWithApprovedStatusAsync,
  fetchClaimByUserWithPendingStatusAsync,
  fetchClaimByUserWithRejectStatusAsync,
  fetchAllRejectedClaimAsync,
  fetchApprovedClaimsFinanceAsync,
  fetchApprovedDetailFinanceAsync,
  fetchClaimByUserWithDraftStatusAsync,
} from "@redux/thunk/Claim/claimThunk";

const initialState: {
  data: Claim[];
  myClaim: Claim[];
  listClaimApproved: ApprovedClaim[];
  detailClaimPending: DetailPendingClaim | null;
  listClaimPending: PendingClaim[];
  listClaimRejected: RejectedClaim[];
  listClaimApprovedFiance: ClaimFinance[];
  detailClaimApprovedFiance: DetailClaimFinance | null;
  totalPages: number;
  listClaimUserApproved: Claim[];
  listClaimUserPending: Claim[];
  listClaimUserRejected: Claim[];
  listClaimUserDraft: Claim[];
  status: string;
  error: string | null;
} = {
  data: [],
  listClaimApproved: [],
  listClaimPending: [],
  detailClaimPending: null as DetailPendingClaim | null,
  listClaimApprovedFiance: [],
  detailClaimApprovedFiance: null as DetailClaimFinance | null,
  listClaimUserApproved: [],
  listClaimUserPending: [],
  listClaimRejected: [],
  listClaimUserRejected: [],
  listClaimUserDraft: [],
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
        state.listClaimApproved = action.payload.data;
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
        state.detailClaimApprovedFiance = Array.isArray(action.payload.data)
          ? action.payload.data[0]
          : action.payload.data;
      })
      .addCase(fetchApprovedDetailFinanceAsync.pending, (state) => {
        state.status = "loading";
      })
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
      //fetch all detail pending claim with role is Approver
      .addCase(fetchPendingClaimDetailAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchPendingClaimDetailAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.detailClaimPending = Array.isArray(action.payload.data)
          ? action.payload.data[0]
          : action.payload.data;
      })
      .addCase(fetchPendingClaimDetailAsync.pending, (state) => {
        state.status = "loading";
      })

      //fetch all rejected claim with role is Approver
      .addCase(fetchAllRejectedClaimAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchAllRejectedClaimAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.listClaimRejected = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllRejectedClaimAsync.pending, (state) => {
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
      )
      //my claim is with draft status
      .addCase(
        fetchClaimByUserWithDraftStatusAsync.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = String(action.error.message);
        }
      )
      .addCase(fetchClaimByUserWithDraftStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchClaimByUserWithDraftStatusAsync.fulfilled,
        (state, action) => {
          state.status = "success";
          state.listClaimUserDraft = action.payload;
        }
      );
  },
});
export default claimSlice.reducer;
