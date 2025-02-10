import { AgeRangeKeys } from './AgeRangeKeys';
import { Permission } from './Permission';
import { Region } from './Region';

export interface Comparison {
  ageRange?: Record<AgeRangeKeys, number> | [number, number];
  humanSex?: 'male' | 'female' | string;
  permission?: Permission;
  selectedParameter?: string;
  selectedLab?: string;
  date?: string;
  parameter?: number;
  selectedRegion: Region[];
}
