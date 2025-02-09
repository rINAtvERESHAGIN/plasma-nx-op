
import { getGeoMapParametrUrl } from '../../../shared/config/mock-dev-only/url';
import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { IRegionScopeData } from '../yuh-client-api/models/RegionScopeData';

type Response = Record<'regions', Record<string, IRegionScopeData>>
class GeoMapService {
  static requestDetectorsBySelectedOption (lab: string, parameter: string, overviewInformation: string): CancelablePromise<Response> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/api/${getGeoMapParametrUrl(lab, parameter, overviewInformation)}`
    });
  }
}

export default GeoMapService;
