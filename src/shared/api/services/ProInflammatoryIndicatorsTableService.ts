import { request as __request } from '@shared/api/core/request';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { type ProInflammatoryIndicators } from '../model/ProInflammatoryIndicatorsTableData';

export class ProInflammatoryIndicatorsTableService {
  static requestGetProInflammatoryIndicatorsTable(): CancelablePromise<ProInflammatoryIndicators> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/pro-inflammatory-indicators/'
    });
  }
}
