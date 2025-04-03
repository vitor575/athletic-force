import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import treinosSlice from "./reducers/treinosSlice";
import temaSlice from "./reducers/temaSlice"

export const store = configureStore({
    reducer: {
        treinos: treinosSlice,
        tema: temaSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
