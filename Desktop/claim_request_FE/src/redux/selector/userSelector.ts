import { RootState } from "@redux/index";

export const selectAllUser = (state: RootState) => state.user.data;
