import httpClient from "@/constant/apiInstance.ts";
// import { ApiResponse } from "@/types/ApiResponse.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "@/utils/delay.ts";
import { claimPending } from "@/types/Pending.ts";
export const fetchAllPendingClaimAsync = createAsyncThunk<claimPending[]>(
    "claim/fetchAllPendingClaim",
    async (): Promise<claimPending[]> => {
        try {
            await delay(1000);
            const response = await httpClient.get(
                "/approvers/pending-claim"
            );
            return response.data as claimPending[];
        } catch (error) {
            console.error("Fetch Claims error " + error);
            throw error;
        }
    }
);
