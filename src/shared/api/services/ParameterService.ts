import { type Parameter } from '@shared/api/model/Parameter';
import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { request as __request } from '../core/request';

class ParametersService {
  static requestParameters (): CancelablePromise<Parameter[]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/parameter/'
    });
  }
}

export default ParametersService;
