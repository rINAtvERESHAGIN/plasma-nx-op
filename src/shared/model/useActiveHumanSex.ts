import { type AnyAction } from 'redux';
import { setHumanSex } from './system-operator';
import { ThunkAction } from '@reduxjs/toolkit';
import { useAppSelector, RootState } from '@org/store-redux';

/**
 * Кастомный хук для доступа к 'humanSex' из Redux 'systemOperator'.
 * @returns {string | undefined}
 */
export const useActiveHumanSex = (): string | undefined => {
  const humanSex = useAppSelector((state) => state.systemOperator.humanSex);
  if (typeof humanSex === 'string') {
    return humanSex;
  }
  return undefined;
};

export const setActiveDefaultHumanSex = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
  const defaultHumanSex = '0';
  dispatch(setHumanSex(defaultHumanSex));
};
