import httpClient from "@/constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import { Claim } from "@/types/Claim";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllClaimAsync = createAsyncThunk<Claim[]>(
  "claim/fetchAllClaim",
  async (): Promise<Claim[]> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
