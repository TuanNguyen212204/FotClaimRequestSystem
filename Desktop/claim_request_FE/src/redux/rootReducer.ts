import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./slice/pendingSlice";
import { detailsSlice } from "./slice/detailsSlice";
import { financeSlice } from "./slices/financeSlice";
<<<<<<< HEAD
import claimsReducer from "./slices/Claim/claimsSlice";
import userClaimSlice from "./slice/userClaimSlice";
import { financeSlice } from "./slices/Finance/claimsSlice";
import claimsReducer from "./slices/Claim/claimsSlice";
=======
import claimsReducer from "./paid/claimsSlice";
import userClaimSlice from "./slice/userClaimSlice";
import { financeSlice } from "./slices/Finance/claimsSlice";
import claimsReducer from "./paid/claimsSlice";
>>>>>>> feature/common-components-Duyanh
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
