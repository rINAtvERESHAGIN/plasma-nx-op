import { type RootState } from '@app/store';
import { updateUserInfo } from '@pages/personal-account/model.ts';
import { type AnyAction } from 'redux';
import { type ThunkAction } from 'redux-thunk';
import AuthService from '@shared/api/services/AuthService';

export const userInfo = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: any) => {
  try {
    const response = await AuthService.requestUserInfo();
    dispatch(updateUserInfo(response));
  } catch (e) {
    throw Error(e);
  }
};
