import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { type AllRegion } from 'types';

export class RegionInfoService {
  static requestRegionInfo(): CancelablePromise<AllRegion> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/regions/'
    });
  }
}
