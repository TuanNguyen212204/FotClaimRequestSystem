import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./slice/pendingSlice";
import { detailsSlice } from "./slice/detailsSlice";
import { financeSlice } from "./slices/financeSlice";
import claimsReducer from "./slices/claimsSlice";
import userClaimSlice from "./slice/userClaimSlice";
import { financeSlice } from "./slices/Finance/claimsSlice";
import claimsReducer from "./slices/claimsSlice";
import { approverSlice } from "./slices/Approver/claimsSlice";
import { projectSlice } from "./slices/Project/projectSlice";
import { userSlice } from "./slices/User/userSlice";
export const rootReducer = combineReducers({
  project: projectSlice.reducer,
  user: userSlice.reducer,
  pending: pendingSlice.reducer,
  details: detailsSlice.reducer,
  finance: financeSlice.reducer,
  userClaims: userClaimSlice.reducer,
  claims: claimsReducer,
  approver: approverSlice.reducer,
});
