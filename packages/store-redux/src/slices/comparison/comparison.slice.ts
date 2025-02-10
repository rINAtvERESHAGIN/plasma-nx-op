import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { comparisonDefaultDate } from '@org/constants-plasma';
import { Comparison } from 'types';

interface InitialState extends Comparison {
  chart: any;
}

const initialState: InitialState = {
  ageRange: { ageFinish: 0, ageStart: 0 },
  humanSex: undefined,
  permission: undefined,
  selectedParameter: undefined,
  selectedLab: undefined,
  date: comparisonDefaultDate,
  selectedRegion: [],
  chart: undefined
};

type UpdateComparisonPayloadAction = InitialState;

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    initComparison: () => {},
    updateComparison: (state, { payload }: PayloadAction<UpdateComparisonPayloadAction>) => ({
      ...state,
      ...payload
    }),
    setComparisonChart: (state, action: PayloadAction) => ({ ...state, chart: action.payload })
  }
});

export const { initComparison, updateComparison, setComparisonChart } = comparisonSlice.actions;
export const comparisonReducer = comparisonSlice.reducer;
