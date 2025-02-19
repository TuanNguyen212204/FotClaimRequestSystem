import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./slice/pendingSlice";
import { detailsSlice } from "./slice/detailsSlice";
import { financeSlice } from "./slices/financeSlice";
import  claimsReducer  from "./slices/claimsSlice";
export const rootReducer = combineReducers({
  pending: pendingSlice.reducer,
  details: detailsSlice.reducer,
  finance: financeSlice.reducer,
  claims: claimsReducer,
});
