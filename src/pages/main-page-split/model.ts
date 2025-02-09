import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
    is3dLayerEnabled: boolean;
    openTimeLine: boolean;
    openSettings:boolean;
    panel1Size: number;
}

const initialState: IInitialState = {
  is3dLayerEnabled: true,
  openTimeLine: false,
  openSettings: false,
  panel1Size: window.innerWidth / 3
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    set3dLayerEnabled: (state, action: PayloadAction<boolean>) => {
      state.is3dLayerEnabled = action.payload;
    },
    setOpenTimeLine: (state, action: PayloadAction<boolean>) => {
      state.openTimeLine = action.payload;
    },
    setOpenSettings: (state, action: PayloadAction<boolean>) => {
      state.openSettings = action.payload;
    },
    setPanel1Size: (state, action: PayloadAction<number>) => {
      state.panel1Size = action.payload;
    }
  }
});

export const { set3dLayerEnabled, setOpenTimeLine,setOpenSettings, setPanel1Size} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
