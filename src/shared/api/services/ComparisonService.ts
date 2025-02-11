import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { type DatasetSpecification } from '@shared/api/model/Comparison';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { request as __request } from '../core/request';

export class ComparisonService {
  static requestSaveComparison (traces: DatasetSpecification[]): CancelablePromise<DatasetSpecification> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/sets/',
      body: traces
    });
  }
}


