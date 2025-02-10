import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RegionIsoCode, RegionNameRu } from 'types';


export interface Region {
  id: number
  name_ru: RegionNameRu
  iso_code: RegionIsoCode
  population: number
  district_name: string
}

export type Regions = Record<RegionIsoCode, Region>

interface IInitialState {
  data: RegionIsoCode[]
}

const initialState: IInitialState = {
  data: []
};

const regionBasketSlice = createSlice({
  name: 'region-basket',
  initialState,
  reducers: {
    addRegionId: (state, action: PayloadAction<RegionIsoCode>) => {
      if (!state.data.includes(action.payload)) {
        state.data.push(action.payload);
      }
    },
    removeRegionId: (state, action: PayloadAction<RegionIsoCode>) => {
      state.data = state.data.filter((id) => id !== action.payload);
    },
    clearRegionBasket: (state) => {
      state.data = [];
    }
  }
});

export const { addRegionId, removeRegionId, clearRegionBasket } = regionBasketSlice.actions;
export const regionBasketReducer = regionBasketSlice.reducer;
