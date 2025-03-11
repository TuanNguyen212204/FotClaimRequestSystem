import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Claim {
  id: string;
  claimID: number;
  pName: string;
  pDuration: string;
  totalWorkingHours: string;
  status: string;
}

interface ClaimsState {
  items: Claim[];
  loading: boolean;
  error: string | null;
}

const initialState: ClaimsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchUserClaims = createAsyncThunk("claims/fetchUserClaims", async () => {
  const response = await axios.get("https://6780c0ac85151f714b07bbd0.mockapi.io/myclaims");
  return response.data.map((item: Claim, index: number) => ({
    ...item,
    claimID: index + 1,
  }));
});

const userClaimSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserClaims.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserClaims.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserClaims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch claims";
      });
  },
});

export default userClaimSlice;
