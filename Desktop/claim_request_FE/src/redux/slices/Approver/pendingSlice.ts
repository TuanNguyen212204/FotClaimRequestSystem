import { createSlice } from "@reduxjs/toolkit";
import type { Pending } from "@types/Pending";
import { fetchAllPendingClaimAsync } from "@/redux/thunk/Approver/pendingThunk";

const initialState: {
  data: Pending[];
  status: string;
  error: string | null;
} = {
  data: [],
  status: "",
  error: null,
};
export const pendingSlice = createSlice({
  name: "pending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPendingClaimAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchAllPendingClaimAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPendingClaimAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});
