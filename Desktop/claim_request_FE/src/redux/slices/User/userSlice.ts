import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/User";
import {
  fetchAllUserAsync,
  fetchUserByIdAsync,
} from "@redux/thunk/User/userThunk";
const initialState: {
  data: User[];
  user: User[];
  status: string;
  error?: string;
} = {
  data: [],
  user: [],
  status: "",
  error: "null",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
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
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      });
  },
});
export default userSlice.reducer;
export const { setUser } = userSlice.actions;
