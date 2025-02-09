import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type applicationStatus = 'loading' | 'error' | undefined;

interface InitialState {
    status: applicationStatus;
}

const initialState: InitialState = {
  status: undefined
};

type PayloadSetApplicationStatusAction = applicationStatus;

const applicationStatusSlice = createSlice({
  name: 'application-status',
  initialState,
  reducers: {
    setApplicationStatus: (_, { payload }: PayloadAction<PayloadSetApplicationStatusAction>) => ({
      status: payload
    })
  }
});

export const { setApplicationStatus } = applicationStatusSlice.actions;
export const applicationStatusReducer = applicationStatusSlice.reducer;
