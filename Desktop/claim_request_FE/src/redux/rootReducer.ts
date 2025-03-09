import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./slice/pendingSlice";
import { detailsSlice } from "./slice/detailsSlice";
import userClaimSlice from "./slice/userClaimSlice";
import { financeSlice } from "./slices/Finance/claimsSlice";
import claimsReducer from "./slices/Claim/claimsSlice";
import { approverSlice } from "./slices/Approver/claimsSlice";
import claimStatusReducer from "./paid/claimStatusSlice";
export const rootReducer = combineReducers({
  pending: pendingSlice.reducer,
  details: detailsSlice.reducer,
  finance: financeSlice.reducer,
  userClaims: userClaimSlice.reducer,
  claims: claimsReducer,
  approver: approverSlice.reducer,
  claimStatus: claimStatusReducer,
});


export type RootState = ReturnType<typeof rootReducer>;