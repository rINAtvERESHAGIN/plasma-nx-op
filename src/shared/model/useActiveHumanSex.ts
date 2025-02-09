import { type RootState, useAppSelector } from '@app/store.ts';
import { type AnyAction } from 'redux';
import { type ThunkAction } from 'redux-thunk';
import { setHumanSex } from './system-operator';

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
