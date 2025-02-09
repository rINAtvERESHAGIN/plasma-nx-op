import { CancelablePromise } from "../../../shared/api/core/CancelablePromise";
import { OpenAPI } from "../../../shared/api/core/OpenAPI";

class MapBoundariesService {
  static requestMapBoudaries(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/boundaries/'
    });
  }
}

export default MapBoundariesService;
