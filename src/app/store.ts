import { BLOCKNOTES_FEATURE_KEY, blocknotesReducer } from "@org/blocknote";
import { combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = {
    [BLOCKNOTES_FEATURE_KEY]: blocknotesReducer 
}
export const store = configureStore({
    reducer: rootReducer,
    // Additional middleware can be passed to this array
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: import.meta.env.MODE !== 'production',
    // Optional Redux store enhancers
    enhancers: [],
  });


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): ThunkDispatch<AppDispatch, undefined, any> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;