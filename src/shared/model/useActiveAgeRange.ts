import { type RootState, useAppSelector } from '@app/store.ts';
import { type AnyAction } from 'redux';
import { type ThunkAction } from 'redux-thunk';
import { setAgeRange } from './system-operator';

/**
 * Кастомный хук для доступа к 'ageRange' из Redux 'systemOperator'.
 * @returns {number[]}
 */
export const useActiveAgeRange = (): number[] => {
  const ageRange = useAppSelector((state) => state.systemOperator.ageRange);
  if (Array.isArray(ageRange)) {
    const isArrayOfNumbers = ageRange.every(item => typeof item === 'number');
    if (isArrayOfNumbers) {
      return ageRange;
    }
  }
  return [];
};

export const setActiveDefaultAgeRange = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
  const defaultAgeRange = [10, 50];
  dispatch(setAgeRange(defaultAgeRange));
};
