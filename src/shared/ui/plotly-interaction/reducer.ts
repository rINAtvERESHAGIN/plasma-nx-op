import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@app/store';
import { type Datum } from 'plotly.js';

interface InitialState {
    xCoordinate: Datum;
}

const initialState: InitialState = {
  xCoordinate: null
};

const plotlyInteractionSlice = createSlice({
  name: 'plotly-interaction',
  initialState,
  reducers: {
    setXCoordinate: (state, { payload }: PayloadAction<Datum>) => {
      return { ...state, xCoordinate: payload };
    }
  }
});

const { setXCoordinate } = plotlyInteractionSlice.actions;

type UpdateXCoordinate = (xCoordinate: Datum) => void;

export const useUpdateXCoordinate = (): UpdateXCoordinate => {
  const dispatch = useAppDispatch();
  return (xCoordinate: Datum) => {
    if (xCoordinate !== null) dispatch(setXCoordinate(xCoordinate));
  };
};

export const useXCoordinate = (): InitialState['xCoordinate'] => {
  const xCoordinate = useAppSelector((state) => state.plotlyInteraction.xCoordinate);

  return xCoordinate;
};

export const plotlyInteractionReducer = plotlyInteractionSlice.reducer;
