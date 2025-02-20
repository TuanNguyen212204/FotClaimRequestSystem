import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./Claim/store/pendingSlice";
import { detailsSlice } from "./Claim/store/detailsSlice";
import { financeSlice } from "./slices/financeSlice";
export const rootReducer = combineReducers({
  pending: pendingSlice.reducer,
  details: detailsSlice.reducer,
  finance: financeSlice.reducer,
});
