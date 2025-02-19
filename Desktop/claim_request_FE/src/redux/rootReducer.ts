import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./slice/pendingSlice";
import { detailsSlice } from "./slice/detailsSlice";
<<<<<<< Updated upstream
import { financeSlice } from "./slices/financeSlice";
export const rootReducer = combineReducers({
  pending: pendingSlice.reducer,
  details: detailsSlice.reducer,
  finance: financeSlice.reducer,
=======
import userClaimSlice from "./slice/userClaimSlice";
export const rootReducer = combineReducers({
    pending: pendingSlice.reducer,
    details: detailsSlice.reducer,
    claims: userClaimSlice.reducer,
>>>>>>> Stashed changes
});
