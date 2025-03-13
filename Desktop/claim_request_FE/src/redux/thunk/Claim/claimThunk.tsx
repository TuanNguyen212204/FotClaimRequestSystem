import httpClient from "@constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import { Claim } from "@/types/Claim";
import { claimPending } from "@/types/Pending";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "@utils/delay";
export const fetchAllClaimAsync = createAsyncThunk<Claim[]>(
  "claim/fetchAllClaim",
  async (): Promise<Claim[]> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<Claim[]>>(
        "/approvers/approved-claim"
      );
      return response.data.data;
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);

export const fetchApprovedClaimsApproverAsync = createAsyncThunk<Claim[]>(
  "claim/approver/fetchApprovedClaim",
  async (): Promise<Claim[]> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<Claim[]>>(
        "/approvers/approved-claim"
      );
      return response.data.data;
    } catch (error) {
      console.error("Fetch Approverd Claims for Approver error " + error);
      throw error;
    }
  }
);

export const fetchAllPendingClaimAsync = createAsyncThunk<claimPending[]>(
  "claim/approver/fetchPendingClaim",
  async (): Promise<claimPending[]> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<claimPending[]>>(
        "/approvers/pending-claim"

      );
      return response.data.data;
    } catch (error) {
      console.error("Fetch Pending Claims for Approver error " + error);
      throw error;
    }
  }
);

