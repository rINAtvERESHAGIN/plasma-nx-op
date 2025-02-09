import { OpenAPI } from '@shared/api/core/OpenAPI';
import { request as __request } from '@shared/api/core/request';
import { type CancelablePromise } from '@shared/api/core/CancelablePromise';

class MapBoundariesService {
  static requestMapBoudaries(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/boundaries/'
    });
  }
}

export default MapBoundariesService;
