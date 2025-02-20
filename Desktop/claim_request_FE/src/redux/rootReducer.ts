import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./slice/pendingSlice";
import { detailsSlice } from "./slice/detailsSlice";
import { financeSlice } from "./slices/financeSlice";
import projectReducer from "./slices/projectSlice";
import staffReducer from "./slices/staffSlice";

export const rootReducer = combineReducers({
  pending: pendingSlice.reducer,
  details: detailsSlice.reducer,
  finance: financeSlice.reducer,
  project: projectReducer,
  staff: staffReducer,
});

export type RootState = ReturnType<typeof rootReducer>;