import { combineReducers } from "@reduxjs/toolkit";
import { financeSlice } from "./slices/financeSlice";

export const rootReducer = combineReducers({ finance: financeSlice.reducer });
