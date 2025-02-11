import { type Detector } from 'types';
import { request as __request } from '../core/request';
import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';

export class DetectorTableService {
  static requestDetectorTable(): CancelablePromise<Detector[]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/detector-table/'
    });
  }

  static requestDetectorRegionParamLab(row_parameter_id, row_dataset_id, row_region_id): CancelablePromise<Detector> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/api/detector_region_param_lab/${row_parameter_id}/${row_dataset_id}/${row_region_id}/`
    });
  }
}
