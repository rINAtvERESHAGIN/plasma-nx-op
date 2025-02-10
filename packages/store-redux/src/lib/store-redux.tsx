import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import {
  applicationStatusReducer,
  blocknotesReducer,
  comparisonReducer,
  coreDataReducer,
  finalFormReduxReducer,
  plotlyInteractionReducer,
  regionBasketReducer,
  reviewChartReducer,
  subHeaderReducer,
  systemOperatorReducer,
  uiReducer,
  userInfoSliceReducer
} from '../slices';
import { BLOCKNOTES_FEATURE_KEY } from '../slices/blocknote/blocknote.slice';
import { documentReducer } from '../slices/root-document/root-document.slice';

const rootReducer = {
  coreData: coreDataReducer,
  systemOperator: systemOperatorReducer,
  applicationStatus: applicationStatusReducer,
  [BLOCKNOTES_FEATURE_KEY]: blocknotesReducer,
  finalFormRedux: finalFormReduxReducer,
  widgetsServiceSubHeader: subHeaderReducer,
  comparison: comparisonReducer,
  reviewChart: reviewChartReducer,
  regionBasket: regionBasketReducer,
  document: documentReducer,
  userInfo: userInfoSliceReducer,
  ui: uiReducer,
  plotlyInteraction: plotlyInteractionReducer
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
