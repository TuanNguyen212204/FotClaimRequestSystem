import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./slice/pendingSlice";
import { detailsSlice } from "./slice/detailsSlice";
import { financeSlice } from "./slices/financeSlice";
import claimsReducer from "./slices/claimsSlice";
import userClaimSlice from "./slice/userClaimSlice";
import { financeSlice } from "./slices/Finance/claimsSlice";
import claimsReducer from "./slices/claimsSlice";
import projectReducer from "./slices/Project/projectSlice";
export const rootReducer = combineReducers({
  pending: pendingSlice.reducer,
  details: detailsSlice.reducer,
  finance: financeSlice.reducer,
  userClaims: userClaimSlice.reducer,
  claims: claimsReducer,
  projects: projectReducer,
});
