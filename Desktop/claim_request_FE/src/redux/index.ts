import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootReducer } from "./rootReducer";
import { thunk } from "redux-thunk";
import projectReducer from './slice/projectSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    rootReducer: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Custom hook to use the typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
