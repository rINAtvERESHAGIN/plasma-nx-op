import { type RegionIsoCode } from './RegionIsoCode';
import { type RegionNameRu } from './RegionNameRu';

export interface Region {
    id: number;
    name_ru: RegionNameRu;
    population: number;
    district_name: string;
    name_latin: string;
    iso_code: RegionIsoCode;
}

export interface IRegion {
    date: string
    detector_now: number
    name: string
    code: string
  }
  