import { RootState, updateUserInfo } from '@org/store-redux';
import { ThunkAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { AuthService } from '../../shared';

export const userInfo = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: any) => {
  try {
    const response = await AuthService.requestUserInfo();
    dispatch(updateUserInfo(response));
  } catch (e) {
    throw Error(e);
  }
};
