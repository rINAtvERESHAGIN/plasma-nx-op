import { type ApiResult } from '@shared/api/core/ApiResult';
import AuthService from '@shared/api/services/AuthService';

export const logout = async (): Promise<ApiResult<unknown>> => {
  return await AuthService.requestLogout();
};
