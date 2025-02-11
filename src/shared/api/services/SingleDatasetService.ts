import { type CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SingleDatasetService {
  static requestGetTrendChartForSingleDataset(datasetSpecification: any): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/single_dataset/',
      body: datasetSpecification
    });
  }

  static requestAgeValueChartForSingleDatasetView(datasetSpecification: any): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/age_value_relationship/',
      body: datasetSpecification
    });
  }

  static requestWeekValueChartForSingleDatasetView(datasetSpecification: any): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/week_value_relationship/',
      body: datasetSpecification
    });
  }

  static requestTrendChartForSingleDatasetSTLDecomposeView(datasetSpecification: any): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/stl_decompose/',
      body: datasetSpecification
    });
  }
}
