import { combineReducers } from "@reduxjs/toolkit";
import { pendingSlice } from "./slice/pendingSlice";
import { detailsSlice } from "./slice/detailsSlice";
export const rootReducer = combineReducers({
    pending: pendingSlice.reducer,
    details: detailsSlice.reducer,
});
