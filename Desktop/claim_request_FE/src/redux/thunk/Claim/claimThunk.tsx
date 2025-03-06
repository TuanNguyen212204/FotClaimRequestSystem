import httpClient from "@/constant/apiInstance";
import { Claim } from "@/types/Claim.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllClaimAsync = createAsyncThunk<Claim[]>(
  "claim/fetchAllClaim",
  async (): Promise<Claim[]> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await httpClient.get("/approvers/claims/pending");

      return response.data as Claim[];
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);
