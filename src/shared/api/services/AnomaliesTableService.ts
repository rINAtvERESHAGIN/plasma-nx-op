import { request as __request } from '../../api/core/request';
import { OpenAPI } from '../../api/core/OpenAPI';
import { type CancelablePromise } from '../../api/core/CancelablePromise';
import { type AnomalyTableData } from 'types';

export class AnomaliesTableService {
  static requestGetAnomaliesTable(): CancelablePromise<AnomalyTableData> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/anomalies/'
    });
  }
}
