
import { type AnyAction } from 'redux';
import { setLab } from './system-operator';
import { ThunkAction } from '@reduxjs/toolkit';
import { useAppSelector, RootState } from 'store-plasma';

/**
 * Кастомный хук для доступа к 'lab' из Redux 'systemOperator'.
 * @returns {{ data: number, default: number }}
 */

export const useActiveLab = (): { data: number; default: number } => {
  const lab = useAppSelector((state) => state.systemOperator.lab);
  return { data: lab, default: lab };
};

export const setActiveDefaultLab = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const labs = getState().coreData._labs;
  if (labs?.data !== undefined) {
    const defaultLab = labs.data.filter((lab) => lab.name_ru === 'Инвитро').reduce((acc, found) => found.id, 0);
    dispatch(setLab(defaultLab));
  }
};
