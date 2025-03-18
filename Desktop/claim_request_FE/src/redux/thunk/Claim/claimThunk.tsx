import httpClient from "@constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import { Claim } from "@/types/Claim";
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

export const fetchApprovedClaimsApproverAsync = createAsyncThunk<
  { data: Claim[]; totalPages: number },
  { page: string; limit: string }
>("claim/approver/fetchApprovedClaim", async ({ page, limit }) => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<Claim[]>>(
      "/approvers/approved-claim",
      { page: page, limit: limit }
    );
    console.log("data: ", response.data);
    return {
      data: response.data.data,
      totalPages: response.data.pagination.totalPages,
    };
  } catch (error) {
    console.error("Fetch Approverd Claims for Approver error " + error);
    throw error;
  }
});
// Pending fetching api
export const fetchAllPendingClaimAsync = createAsyncThunk<
  { data: Claim[]; totalPages: number },
  { page: string; limit: string }
>("claim/approver/fetchPendingClaim", async ({ page, limit }) => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<Claim[]>>(
      "/approvers/pending-claim",
      { page: page, limit: limit }
    );
    console.log("data: ", response.data);
    return {
      data: response.data.data || [],
      totalPages: response.data.pagination?.totalPages,
    };
  } catch (error) {
    console.error("Fetch Pending Claims for Approver error " + error);
    throw error;
  }
});

export const fetchClaimByUserAsync = createAsyncThunk<Claim[]>(
  "claim/fetchUserClaim",
  async (): Promise<Claim[]> => {
    try {
      await delay(1000);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User id not found");
      }
      const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
        userID: userId,
      });
      return response.data.data;
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);

export const fetchClaimByUserWithPendingStatusAsync = createAsyncThunk<Claim[]>(
  "claim/fetchClaimByUserWithPendingStatusAsync",
  async (): Promise<Claim[]> => {
    try {
      await delay(1000);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User id not found");
      }
      const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
        userID: userId,
      });
      return response.data.data.filter(
        (claim) => claim.claim_status === "PENDING"
      );
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);

export const fetchClaimByUserWithApprovedStatusAsync = createAsyncThunk<
  Claim[]
>(
  "claim/fetchClaimByUserWithApprovedStatusAsync",
  async (): Promise<Claim[]> => {
    try {
      await delay(1000);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User id not found");
      }
      const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
        userID: userId,
      });
      return response.data.data.filter(
        (claim) => claim.claim_status === "APPROVED"
      );
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);

export const fetchClaimByUserWithRejectStatusAsync = createAsyncThunk<Claim[]>(
  "claim/fetchClaimByUserWithRejectStatusAsync",
  async (): Promise<Claim[]> => {
    try {
      await delay(1000);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User id not found");
      }
      const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
        userID: userId,
      });
      return response.data.data.filter(
        (claim) => claim.claim_status === "REJECTED"
      );
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);
