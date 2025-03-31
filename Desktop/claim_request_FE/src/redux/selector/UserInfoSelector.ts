import { RootState } from "@redux/index";
import { User, UserInformation } from "@/types/User";

export const selectUserInfo = (state: RootState): User | null =>
  state.userInfo.selectedUser;

export const selectUserInfoStatus = (state: RootState): string =>
  state.userInfo.status;

export const selectUserInfoError = (state: RootState): string | null =>
  state.userInfo.error;

export const selectUserInformation = (
  state: RootState
): UserInformation | null => state.user.userInformation;
