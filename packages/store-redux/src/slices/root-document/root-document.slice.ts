
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IRegionScopeData, RegionMap, Timeline } from 'types';


interface Data {
    timeline?: Timeline[];
    regions?: RegionMap;
}

interface IInitialState {
    data?: Data;
}

const initialState: IInitialState = {
  data: { regions: undefined, timeline: undefined }
};

type PayloadInitDocumentAction = Pick<IInitialState, 'data'>;
type PayloadUpdateDocumentAction = Record<'regions', Record<string, IRegionScopeData>>;

const documentSlice = createSlice({
  name: 'documentSlice',
  initialState,
  reducers: {
    initDocument: (state, { payload: { data } }: PayloadAction<PayloadInitDocumentAction>) => ({ data }),
    updateDocument: (state, { payload: { regions } }: PayloadAction<PayloadUpdateDocumentAction>) => ({
      data: { ...regions }
    })
  }
});

export const { initDocument, updateDocument } = documentSlice.actions;
export const documentReducer = documentSlice.reducer;
