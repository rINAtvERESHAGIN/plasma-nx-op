import { requestWithStatus, request } from '../core/request';
import { type ApiResult } from '../core/ApiResult';
import { UserProfile } from '../../../pages/personal-account/model';
import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';

export class AuthService {
  static requestAuthorization(username: string, password: string): CancelablePromise<ApiResult<unknown>> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return requestWithStatus(OpenAPI, {
      method: 'POST',
      url: '/api/auth/login/',
      body: formData
    });
  }

  static requestLogout(): CancelablePromise<ApiResult<unknown>> {
    return requestWithStatus(OpenAPI, {
      method: 'GET',
      url: '/api/auth/logout/'
    });
  }

  static requestUserInfo(): CancelablePromise<UserProfile> {
    return request(OpenAPI, {
      method: 'GET',
      url: '/api/auth/user_info/'
    });
  }

  static requestSessionId(): CancelablePromise<ApiResult<unknown>> {
    return requestWithStatus(OpenAPI, {
      method: 'GET',
      url: '/api/auth/check_tokens/'
    });
  }
}
