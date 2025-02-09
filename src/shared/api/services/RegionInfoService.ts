import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { request as __request } from '../core/request';
import { type AllRegion } from '../model/AllRegion';

class RegionInfoService {
  static requestRegionInfo(): CancelablePromise<AllRegion> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/regions/'
    });
  }
}

export default RegionInfoService;
