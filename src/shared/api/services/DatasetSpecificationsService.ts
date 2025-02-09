import { type CancelablePromise } from '../core/CancelablePromise';
import { type DatasetSpecification } from '../model/Comparison';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';

class DatasetSpecificationsService {
  static requestSendDatasetSpecifications (params: DatasetSpecification[]): CancelablePromise<DatasetSpecification> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/sets/',
      body: params
    });
  }
}

export default DatasetSpecificationsService;
