import { type CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

// написать ключи регионов

type RegionCodes = 'RU-AL' | 'RU-ALT';
//      "id": 1,
//     "name_ru": "Алтай республика",
//     "population": -1,
//     "district_name": "Сибирский ФО"

interface Region {
  id: number;
  name_ru: string;
  codeName: RegionCodes;
  // ...
}

type AllRegion = Record<RegionCodes, Region>;

export class RegionService {
  static requestGetAllRegions(): CancelablePromise<AllRegion> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/regions/'
    });
  }
}
