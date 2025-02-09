import { type RootState, useAppSelector } from '@app/store.ts';
import { type AnyAction } from 'redux';
import { type ThunkAction } from 'redux-thunk';
import { type Region } from '@shared/api/model/Region';
import { setRegion } from './system-operator';

/**
 * Кастомный хук для доступа к 'region' из Redux 'systemOperator'.
 * @returns {{ data: string, default: string }}
 */

export const useActiveRegion = (): { data?: Region; default?: Region } => {
  const region = useAppSelector((state) => state.systemOperator.region);

  return { data: region, default: undefined };
};

export const setActiveDefaultRegion = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const regions = getState().coreData._regions;
  if (regions?.data !== undefined) {
    const defaultRegion = regions.data['RU-MOW'];
    dispatch(setRegion(defaultRegion));
  }
};
