import { RootState } from "@redux/index";
import { User } from "@/types/User";

export const selectUserInfo = (state: RootState): User | null =>
  state.userInfo.selectedUser;

export const selectUserInfoStatus = (state: RootState): string =>
  state.userInfo.status;

export const selectUserInfoError = (state: RootState): string | null =>
  state.userInfo.error;

export const selectAllUsers = (state: RootState): User[] => state.userInfo.data;
