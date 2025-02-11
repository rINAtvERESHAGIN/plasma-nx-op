import { AuthService } from "../../shared";
import { ApiResult } from "../../shared/api/core/ApiResult";


export const logout = async (): Promise<ApiResult<unknown>> => {
  return await AuthService.requestLogout();
};
