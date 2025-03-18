import { ApiResponse } from "@/types/ApiResponse";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/constant/apiInstance";
import { AxiosResponse } from "axios";

interface ClaimDetail {
  date: string;
  working_hours: number;
}

interface ClaimData {
  request_id: string;
  user_id: string;
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  submitted_date: string;
  approved_date: string;
  paid_date: string;
  claim_status: string;
  full_name: string;
  salary_overtime: string;
  claim_details: ClaimDetail[];
}

interface PaidClaimsState {
  data: ClaimData[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

export const fetchPaidClaimsAsync = createAsyncThunk<ApiResponse<ClaimData[]>, string>(
  "paidClaims/fetchPaidClaims",
  async (page: string): Promise<ApiResponse<ClaimData[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<ClaimData[]>> = await httpClient.get(
        `/finance/claims/paid?page=${page}&limit=10`
      );
      return response.data;
    } catch (error) {
      console.error("Fetch Paid Claims error ", error);
      throw error;
    }
  }
);

const initialState: PaidClaimsState = {
  data: [],
  loading: true,
  error: null,
  totalPages: 1,
  currentPage: 1
};

const paidClaimsSlice = createSlice({
  name: "paidClaims",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaidClaimsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaidClaimsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPaidClaimsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch paid claims";
        state.data = [];
      });
  },
});

export default paidClaimsSlice.reducer;
