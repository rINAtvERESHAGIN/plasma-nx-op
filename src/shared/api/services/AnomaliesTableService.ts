import { request as __request } from '@shared/api/core/request';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { type AnomalyTableData } from '../model/AnomalyTableData';

export class AnomaliesTableService {
  static requestGetAnomaliesTable(): CancelablePromise<AnomalyTableData> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/anomalies/'
    });
  }
}
