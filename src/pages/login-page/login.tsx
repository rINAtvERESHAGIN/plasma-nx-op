import { type ApiResult } from '@shared/api/core/ApiResult';
import AuthService from '@shared/api/services/AuthService';

export const login = async (username: string, password: string): Promise<ApiResult<unknown>> => {
  return await AuthService.requestAuthorization(username, password);
};
