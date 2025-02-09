import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { type Detector } from '@shared/api/yuh-client-api/models/Detector';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { request as __request } from '../core/request';

class DetectorTableService {
  static requestDetectorTable (): CancelablePromise<Detector[]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/detector-table/'
    });
  }

  static requestDetectorRegionParamLab (row_parameter_id, row_dataset_id, row_region_id): CancelablePromise<Detector> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/api/detector_region_param_lab/${row_parameter_id}/${row_dataset_id}/${row_region_id}/`
    });
  }
}

export default DetectorTableService;
