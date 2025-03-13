import { combineReducers } from "@reduxjs/toolkit";
// import { pendingSlice } from "./slice/pendingSlice";
// import { detailsSlice } from "./slice/detailsSlice";
// import { financeSlice } from "./slices/financeSlice";
// import claimsReducer from "./slice/claimsSlice";
// import userClaimSlice from "./slice/userClaimSlice";
// import { financeSlice } from "./Finance/claimsSlice";
// import claimsReducer from "./slice/claimsSlice";
// import { approverSlice } from "./Approver/claimsSlice";
import projectReducer from "./slices/Project/projectSlice";
import { userSlice } from "./slices/User/userSlice.ts";
import { claimSlice } from "./slices/Claim/claimSlice";
export const rootReducer = combineReducers({
  // pending: pendingSlice.reducer,
  // details: detailsSlice.reducer,
  // finance: financeSlice.reducer,
  //
  user: userSlice.reducer,
  claim: claimSlice.reducer,
  projects: projectReducer,
  // details: detailsSlice.reducer,
  //
  // userClaims: userClaimSlice.reducer,
  // claims: claimsReducer,
  // approver: approverSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
