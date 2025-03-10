import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./slice/pendingSlice";
import { detailsSlice } from "./slice/detailsSlice";
import userClaimSlice from "./slice/userClaimSlice";
import claimsReducer from "./slices/Claim/claimsSlice";
import userReducer from "@redux/slices/UserInfo/UserInfoSlice";
export const rootReducer = combineReducers({
  pending: pendingSlice.reducer,
  details: detailsSlice.reducer,
  userClaims: userClaimSlice.reducer,
  claims: claimsReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
