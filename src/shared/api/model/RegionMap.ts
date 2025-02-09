import { type Region } from '@shared/model/regions';

export interface ParameterizedRegion {
  date?: string;
  detector_now?: number;
  name?: Region['name_ru'];
  code?: Region['iso_code'];
  r?: number;
  g?: number;
  b?: number;
  alpha?: number;
  status?: string;
}

export type DataWhen = string;
export type RegionMap = Record<DataWhen, ParameterizedRegion>;
