
import { type AnyAction } from 'redux';
import { setRegion } from './system-operator';
import { Region } from './regions';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState, useAppSelector } from 'store-plasma';

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
