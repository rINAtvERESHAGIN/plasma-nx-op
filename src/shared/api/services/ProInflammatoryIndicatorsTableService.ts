import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { type CancelablePromise } from '../core/CancelablePromise';
import { type ProInflammatoryIndicators } from 'types';

export class ProInflammatoryIndicatorsTableService {
  static requestGetProInflammatoryIndicatorsTable(): CancelablePromise<ProInflammatoryIndicators> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/pro-inflammatory-indicators/'
    });
  }
}
