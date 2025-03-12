import { combineReducers } from "@reduxjs/toolkit";
// import { pendingSlice } from "./slice/pendingSlice";
// import { detailsSlice } from "./slice/detailsSlice";
// import { financeSlice } from "./slices/financeSlice";
// import claimsReducer from "./slice/claimsSlice";

// import { financeSlice } from "./Finance/claimsSlice";
// import claimsReducer from "./slice/claimsSlice";
// import { approverSlice } from "./Approver/claimsSlice";

import projectReducer from "./slices/Project/projectSlice";
import { pendingSlice } from "./slices/Approver/pendingSlice.ts";
import { userSlice } from "./slices/User/userSlice.ts";
import { claimSlice } from "./slices/Claim/claimSlice";
export const rootReducer = combineReducers({
  // pending: pendingSlice.reducer,
  // details: detailsSlice.reducer,
  // finance: financeSlice.reducer,
  //
  user: userSlice.reducer,
  claim: claimSlice.reducer,
  pending: pendingSlice.reducer,
  // details: detailsSlice.reducer,
  //
  
  // claims: claimsReducer,
  // approver: approverSlice.reducer,
  projects: projectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
