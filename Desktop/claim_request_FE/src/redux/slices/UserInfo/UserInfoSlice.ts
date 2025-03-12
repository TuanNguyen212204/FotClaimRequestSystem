import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/User";
import {
  fetchUserByIdAsync,
  updateUserAsync,
} from "@redux/thunk/UserInfo/userInfoThunks";

const initialState: {
  selectedUser: User | null;
  status: string;
  error: string | null;
} = {
  selectedUser: null,
  status: "",
  error: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.selectedUser = action.payload;
      })

      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.selectedUser = action.payload;
      });
  },
});

export default userInfoSlice.reducer;
