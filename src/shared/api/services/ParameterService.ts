
import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { Parameter } from '../../../../types/src/lib/Parameter';

class ParametersService {
  static requestParameters (): CancelablePromise<Parameter[]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/parameter/'
    });
  }
}

export default ParametersService;
