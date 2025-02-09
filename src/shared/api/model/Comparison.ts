import { type Region } from '@shared/model/regions';

export type AgeRangeKeys = 'ageStart | ageFinish';
export type Permission = 'day' | 'week' | 'month';
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

export type DatasetSpecification = Comparison;
