import { type AnyAction } from 'redux';
import { setParameter } from './system-operator';
import { ThunkAction } from '@reduxjs/toolkit';
import { useAppSelector, RootState } from 'store-plasma';

/**
 * Кастомный хук для доступа к 'parameter' из Redux 'systemOperator'.
 * @returns {{ data: number, default: number }}
 */

export const useActiveParameter = (): { data: number; default: number } => {
  const parameter = useAppSelector((state) => state.systemOperator.parameter);

  return { data: parameter, default: 0 };
};

export const setActiveDefaultParameter =
    (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
      const parameters = getState().coreData._parameters;
      if (parameters?.data !== undefined) {
        const defaultParameter = parameters.data
          .filter((parameter) => parameter.name_en === 'lymphocytes_percent')
          .reduce((acc, found) => found.id, 0);
        dispatch(setParameter(defaultParameter));
      }
    };
