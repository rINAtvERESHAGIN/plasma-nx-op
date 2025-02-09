import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'store-plasma';
import { Region } from './regions';

interface IInitialState {
    lab?: number;
    parameter?: number;
    overviewInformation?: string;
    date?: string;
    region?: Region;
    humanSex?: string;
    ageRange?: number[];
}
type SystemOperator = IInitialState

const initialState: IInitialState = {
  lab: 0,
  parameter: 0,
  overviewInformation: 'detector',
  date: '',
  region: undefined,
  humanSex: undefined,
  ageRange: undefined
};

interface PayloadSetSelectedDateAction {
    date: string;
}

const systemOperatorSlice = createSlice({
  name: 'system-operator',
  initialState,
  reducers: {
    setLab: (state, action: PayloadAction<number>) => ({
      ...state,
      lab: action.payload
    }),
    setParameter: (state, action: PayloadAction<number>) => ({
      ...state,
      parameter: action.payload
    }),
    setOverviewInformation: (state, action: PayloadAction<string>) => ({
      ...state,
      overviewInformation: action.payload
    }),
    setDate: (state, { payload: { date } }: PayloadAction<PayloadSetSelectedDateAction>) => ({
      ...state,
      date
    }),
    setRegion: (state, action: PayloadAction<Region>) => ({
      ...state,
      region: action.payload
    }),
    setHumanSex: (state, action: PayloadAction<string>) => ({
      ...state,
      humanSex: action.payload
    }),
    setAgeRange: (state, action: PayloadAction<number[]>) => ({
      ...state,
      ageRange: action.payload
    })
  }
});

export const { setLab, setParameter, setOverviewInformation, setDate, setRegion, setHumanSex, setAgeRange } = systemOperatorSlice.actions;
export const systemOperatorReducer = systemOperatorSlice.reducer;

/**
 * Кастомный хук для доступа к 'overviewInformation' из Redux 'systemOperator'.
 * @returns {string | undefined}
 */
export const useOverviewInformation = (): string | undefined => {
  const overviewInformation = useAppSelector((state) => state.systemOperator.overviewInformation);
  if (typeof overviewInformation === 'string') {
    return overviewInformation;
  }
  return undefined;
};

/**
 * Кастомный хук для доступа к 'date' из Redux 'systemOperator'.
 * @returns {string | undefined}
 */
export const useActiveDate = () => {
  const date = useAppSelector((state) => state.systemOperator.date);
  if (typeof date === 'string') {
    return date;
  }
  return undefined;
};
