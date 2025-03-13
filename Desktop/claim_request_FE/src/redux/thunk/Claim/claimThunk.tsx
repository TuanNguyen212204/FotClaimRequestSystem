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
