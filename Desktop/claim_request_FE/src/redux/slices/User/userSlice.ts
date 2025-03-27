import { createSlice } from "@reduxjs/toolkit";
import type { User, UserInformation } from "@/types/User";
import {
  fetchAllUserAsync,
  fetchUserByIdAsync,
  fetchTotalPage,
} from "@redux/thunk/User/userThunk";
import { fetchUserInformationAsync } from "@/redux/thunk/UserInfo/userInfoThunks";

const initialState: {
  data: User[];
  user: User | null;
  userInformation: UserInformation | null;
  totalPageOfAllUser: number;
  status: string;
  error?: string;
} = {
  data: [],
  user: null,
  userInformation: null as UserInformation | null,
  totalPageOfAllUser: 0,
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
        state.user = action.payload[0];
      })
      .addCase(fetchTotalPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchTotalPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTotalPage.fulfilled, (state, action) => {
        state.status = "success";
        state.totalPageOfAllUser = action.payload;
      })
      //------------------------------------------------- GET INFO USER Phu  ----------------------------------------------------------------------
      .addCase(fetchUserInformationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchUserInformationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInformationAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.userInformation = Array.isArray(action.payload.data)
          ? action.payload.data[0]
          : action.payload.data;
      });
  },
});
export default userSlice.reducer;
export const { setUser } = userSlice.actions;
