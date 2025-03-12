import { combineReducers } from "@reduxjs/toolkit";
// import { pendingSlice } from "./slice/pendingSlice";
// import { detailsSlice } from "./slice/detailsSlice";
// import { financeSlice } from "./slices/financeSlice";
// import claimsReducer from "./slice/claimsSlice";
import userClaimSlice from "./slices/Claim/userClaimSlice";
// import { financeSlice } from "./Finance/claimsSlice";
// import claimsReducer from "./slice/claimsSlice";
// import { approverSlice } from "./Approver/claimsSlice";
import { claimSlice } from "./slices/Claim/claimSlice";
import userReducer from "@redux/slices/UserInfo/UserInfoSlice";
import projectReducer from "./slices/Project/projectSlice";
import { pendingSlice } from "./slices/Approver/pendingSlice.ts";
export const rootReducer = combineReducers({
  // pending: pendingSlice.reducer,
  // details: detailsSlice.reducer,
  // finance: financeSlice.reducer,
  //
  user: userReducer,
  claim: claimSlice.reducer,
  pending: pendingSlice.reducer,
  // details: detailsSlice.reducer,
  //
  userClaims: userClaimSlice.reducer,
  // claims: claimsReducer,
  // approver: approverSlice.reducer,
  projects: projectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
