import { combineReducers } from "@reduxjs/toolkit";
// import { pendingSlice } from "./slice/pendingSlice";
// import { detailsSlice } from "./slice/detailsSlice";
// import { financeSlice } from "./slices/financeSlice";
// import claimsReducer from "./slice/claimsSlice";
// import userClaimSlice from "./slice/userClaimSlice";
// import { financeSlice } from "./Finance/claimsSlice";
// import claimsReducer from "./slice/claimsSlice";
// import { approverSlice } from "./Approver/claimsSlice";
import { userSlice } from "./slices/User/userSlice";
import { claimSlice } from "./slices/Claim/claimSlice";
import { projectSlice } from "./slices/Project/projectSlice";
export const rootReducer = combineReducers({
  // pending: pendingSlice.reducer,
  // details: detailsSlice.reducer,
  // finance: financeSlice.reducer,
  //
  user: userSlice.reducer,
  claim: claimSlice.reducer,
  project: projectSlice.reducer,
  //
  // userClaims: userClaimSlice.reducer,
  // claims: claimsReducer,
  // approver: approverSlice.reducer,
});


export type RootState = ReturnType<typeof rootReducer>;