import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RegionIsoCode } from '@shared/api/model/RegionIsoCode';
import { type RegionNameRu } from '@shared/api/model/RegionNameRu';

export interface Region {
  id: number
  name_ru: RegionNameRu
  iso_code: RegionIsoCode
  population: number
  district_name: string
}

export type Regions = Record<RegionIsoCode, Region>

interface IInitialState {
  data?: Regions
}

const initialState: IInitialState = {
  data: undefined
};

const regionSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setRegions: (state, action: PayloadAction<Regions>) => {
      state.data = action.payload;
    }
  }
});

export const { setRegions } = regionSlice.actions;

export const regionsReducer = regionSlice.reducer;
