import { AuthService } from '../../shared';
import { ApiResult } from '../../shared/api/core/ApiResult';

export const login = async (username: string, password: string): Promise<ApiResult<unknown>> => {
  return await AuthService.requestAuthorization(username, password);
};
