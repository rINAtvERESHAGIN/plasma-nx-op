import { DatasetSpecification } from 'types';
import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ComparisonService {
  static requestSaveComparison(traces: DatasetSpecification[]): CancelablePromise<DatasetSpecification> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/sets/',
      body: traces
    });
  }
}
