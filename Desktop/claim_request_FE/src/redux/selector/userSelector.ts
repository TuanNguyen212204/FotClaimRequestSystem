import { RootState } from "@redux/index";

export const selectAllUser = (state: RootState) => state.user.data;
export const selectUserById = (state: RootState) => state.user.user;
export const selectTotalPageOfAllUser = (state: RootState) =>
  state.user.totalPageOfAllUser;
