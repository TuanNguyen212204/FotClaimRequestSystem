import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

type Store = typeof store;
type AppDispatch = Store["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<Store["getState"]>;
