import { type DatasetSpecification } from '@shared/api/model/Comparison';
import { request as __request } from '@shared/api/core/request';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { type RequestCohortaData } from '@features/portal/type';

export class CohortService {
  static requestSendCohort(params: RequestCohortaData, url: string): CancelablePromise<DatasetSpecification> {
    return __request(OpenAPI, {
      method: 'POST',
      url,
      body: params
    });
  }
}
