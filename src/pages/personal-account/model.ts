import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
    username: string;
    email: string;
    last_name: string;
    first_name: string;
}

type IInitialState = UserProfile;

const initialState: IInitialState = {
  username: '',
  email: '',
  last_name: '',
  first_name: ''
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUserInfo: (state, { payload }: PayloadAction<IInitialState>) => ({
      ...state,
      ...payload
    })
  }
});

export const { updateUserInfo } = userInfoSlice.actions;
export const userInfoSliceReducer = userInfoSlice.reducer;
