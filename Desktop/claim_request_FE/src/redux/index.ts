import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootReducer } from "./rootReducer";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

type Store = typeof store;
type AppDispatch = Store["dispatch"];



export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<Store["getState"]>;
