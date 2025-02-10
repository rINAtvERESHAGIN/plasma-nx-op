import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UpdateFormStatePayloadAction {
  formName: string
  formState: any
}

const initialState = {
  trace: {}
};

const finalFormReduxSlice = createSlice({
  name: 'final-form-redux',
  initialState,
  reducers: {
    updateFormState: (state, { payload: { formName, formState } }: PayloadAction<UpdateFormStatePayloadAction>) => ({
      ...state,
      [formName]: { ...formState }
    })
  }
});

export const { updateFormState } = finalFormReduxSlice.actions;
export const finalFormReduxReducer = finalFormReduxSlice.reducer;
