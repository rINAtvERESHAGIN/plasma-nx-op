import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  showSubHeader: boolean
}

const initialState: InitialState = {
  showSubHeader: false
};

const subHeaderSlice = createSlice({
  name: 'sub-header',
  initialState,
  reducers: {
    showSubHeader: (state) => ({ ...state, showSubHeader: true }),
    hideSubHeader: (state) => ({ ...state, showSubHeader: false })
  }
});

export const { showSubHeader, hideSubHeader } = subHeaderSlice.actions;
export const subHeaderReducer = subHeaderSlice.reducer;
