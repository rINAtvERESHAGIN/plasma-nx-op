import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IRegionScopeData } from '@shared/api/yuh-client-api/models/RegionScopeData';
import { type RegionMap } from '@shared/api/model/RegionMap';
import { type Timeline } from 'timeline/shared/api/types/Timeline';

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
