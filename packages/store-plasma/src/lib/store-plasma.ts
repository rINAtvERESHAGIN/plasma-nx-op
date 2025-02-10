import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector,useDispatch } from 'react-redux';
import { applicationStatusReducer, blocknotesReducer, coreDataReducer, finalFormReduxReducer, subHeaderReducer, systemOperatorReducer } from '../slices';
import { BLOCKNOTES_FEATURE_KEY } from '../slices/blocknote/blocknote.slice';


const rootReducer = {
  coreData: coreDataReducer,
  systemOperator: systemOperatorReducer,
  applicationStatus:applicationStatusReducer,
  [BLOCKNOTES_FEATURE_KEY]: blocknotesReducer,
  finalFormRedux: finalFormReduxReducer,
  widgetsServiceSubHeader: subHeaderReducer,
  
};
export const store = configureStore({
  reducer: rootReducer,
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.MODE !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): ThunkDispatch<AppDispatch, undefined, any> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
