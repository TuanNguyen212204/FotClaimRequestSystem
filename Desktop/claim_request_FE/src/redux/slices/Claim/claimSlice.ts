import { createSlice } from "@reduxjs/toolkit";
import type { Claim } from "@/types/Claim";
import { fetchAllClaimAsync } from "@/redux/thunk/Claim/claimThunk";

const initialState: {
  data: Claim[];
  status: string;
  error: string | null;
} = {
  data: [],
  status: "",
  error: null,
};
export const claimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClaimAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchAllClaimAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllClaimAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});
export default claimSlice.reducer;
