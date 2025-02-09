import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IParameter } from '@shared/api/model/Parameter';

interface IInitialState {
  data: undefined | IParameter[]
}

const initialState: IInitialState = {
  data: undefined
};

interface PayloadInitParametersAction { parameters: IInitialState['data'] }
interface PayloadSetParametersAction { parameters: IInitialState['data'] }

const parameterSlice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    initParameters: (state, { payload: { parameters } }: PayloadAction<PayloadInitParametersAction>) => ({ data: parameters }),
    setParameters: (state, action: PayloadAction<PayloadSetParametersAction>) => ({
      ...state,
      data: action.payload.parameters
    })
  }
});

export const { initParameters, setParameters } = parameterSlice.actions;
export const parameterSliceReducer = parameterSlice.reducer;
