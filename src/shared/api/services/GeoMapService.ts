import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { getGeoMapParametrUrl } from '@shared/config/mock-dev-only/url';
import { type IRegionScopeData } from '@shared/api/yuh-client-api/models/RegionScopeData';
import { request as __request } from '../core/request';

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
