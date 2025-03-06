import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./Claim/store/pendingThunk";
import { detailsSlice } from "./Claim/store/detailsThunk";
// import { financeSlice } from "./slices/financeSlice";
// import claimsReducer from "./slices/claimsSlice";
// import userClaimSlice from "./slice/userClaimSlice";
import { financeSlice } from "./slices/Finance/claimsSlice";
import claimsReducer from "./slices/claimsSlice";
import { approverSlice } from "./slices/Approver/claimsSlice";
import userReducer from "@redux/slices/UserInfo/UserInfoSlice"
export const rootReducer = combineReducers({
  pending: pendingSlice.reducer,
  details: detailsSlice.reducer,
  finance: financeSlice.reducer,
  // userClaims: userClaimSlice.reducer,  
  claims: claimsReducer,
  approver: approverSlice.reducer,
  user: userReducer,
});


export type RootState = ReturnType<typeof rootReducer>;