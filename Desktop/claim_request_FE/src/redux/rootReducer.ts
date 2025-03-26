import { combineReducers } from "@reduxjs/toolkit";
// import { pendingSlice } from "./slice/pendingSlice";
// import { detailsSlice } from "./slice/detailsSlice";
// import { financeSlice } from "./slices/financeSlice";
// import claimsReducer from "./slice/claimsSlice";

// import { financeSlice } from "./Finance/claimsSlice";
// import claimsReducer from "./slice/claimsSlice";
// import { approverSlice } from "./Approver/claimsSlice";

import projectReducer from "./slice/projectSlice";
import projectSlide from "@redux/slices/Project/projectSlice.ts";
import { userSlice } from "./slices/User/userSlice.ts";
import { claimSlice } from "./slices/Claim/claimSlice";
import {notificationSlice}  from "./slices/notification/notificationSlice.ts"
import vyReducer from "./slices/VySlice";
import paidClaimsReducer from "./slices/Claim/paidClaimsSlice";

export const rootReducer = combineReducers({
  // pending: pendingSlice.reducer,
  // details: detailsSlice.reducer,
  // finance: financeSlice.reducer,
  //
  paidClaims: paidClaimsReducer,
  project_An: projectSlide,
  user: userSlice.reducer,
  claim: claimSlice.reducer,
  projects: projectReducer,
  vy: vyReducer,
  notifications: notificationSlice.reducer,
  // details: detailsSlice.reducer,
  //

  // claims: claimsReducer,
  // approver: approverSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
