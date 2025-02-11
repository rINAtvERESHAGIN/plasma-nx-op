import { type DatasetSpecification } from 'types';
import { request as __request } from '../../api/core/request';
import { OpenAPI } from '../../api/core/OpenAPI';
import { type CancelablePromise } from '../../api/core/CancelablePromise';
import { type RequestCohortaData } from 'types';

export class CohortService {
  static requestSendCohort(params: RequestCohortaData, url: string): CancelablePromise<DatasetSpecification> {
    return __request(OpenAPI, {
      method: 'POST',
      url,
      body: params
    });
  }
}
