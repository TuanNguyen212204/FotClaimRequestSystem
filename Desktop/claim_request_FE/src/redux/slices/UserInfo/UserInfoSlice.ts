import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllUsersAsync,
  fetchUserByIdAsync,
  updateUserAsync,
} from "@redux/thunk/UserInfo/userInfoThunks";
import { User } from "@/types/User";

interface UserState {
  data: User[];
  selectedUser: User | null;
  status: string;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  selectedUser: null,
  status: "",
  error: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchUserByIdAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.selectedUser = action.payload;
        }
      )
      .addCase(
        fetchUserByIdAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch user";
        }
      )

      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchAllUsersAsync.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = "success";
          state.data = action.payload;
        }
      )
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch users";
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateUserAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.selectedUser = action.payload;
        }
      )
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update user";
      });
  },
});

export const { setSelectedUser, updateUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
