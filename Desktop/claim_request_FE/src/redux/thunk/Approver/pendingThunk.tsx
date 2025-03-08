import httpClient from "@/constant/apiInstance.ts";
import { ApiResponse } from "@/types/ApiResponse.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "@/utils/delay.ts";
import { Pending } from "@/types/Pending.ts";
export const fetchAllPendingClaimAsync = createAsyncThunk<Pending[]>(
    "claim/fetchAllPendingClaim",
    async (): Promise<Pending[]> => {
        try {
            await delay(1000);
            const response = await httpClient.get<ApiResponse<Pending[]>>(
                "/approvers/pending-claim"
            );
            return response.data.data;
        } catch (error) {
            console.error("Fetch Claims error " + error);
            throw error;
        }
    }
);
