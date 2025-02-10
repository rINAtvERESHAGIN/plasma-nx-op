import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { BLOCKNOTES_FEATURE_KEY, blocknotesReducer } from '../slices/blocknote/blocknote.slice';

const rootReducer = {
  [BLOCKNOTES_FEATURE_KEY]: blocknotesReducer 
}
export const store = configureStore({
  reducer: rootReducer,
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): ThunkDispatch<AppDispatch, undefined, any> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;