import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/User";
import { fetchAllUserAsync } from "@/redux/thunk/User/userThunk";

const initialState: {
  data: User[];
  status: string;
  error: string | null;
} = {
  data: [],
  status: "",
  error: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchAllUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});
export default userSlice.reducer;
