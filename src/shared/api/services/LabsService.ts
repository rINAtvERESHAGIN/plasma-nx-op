import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { Lab } from 'types';

export class LabsService {
  static requestLabs(): CancelablePromise<Lab[]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/labs/'
    });
  }
}
