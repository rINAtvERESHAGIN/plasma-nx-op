import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { type Lab } from '@shared/api/model/Lab';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { request as __request } from '../core/request';

class LabsService {
  static requestLabs(): CancelablePromise<Lab[]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/labs/'
    });
  }
}

export default LabsService;
