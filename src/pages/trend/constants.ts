import type { TrendFilterValues } from './type';

export const thirdSectionButtons = [
  { label: 'Возрастная зависимость', value: 'ageValue' },
  { label: 'Половозрастная пирамида', value: 'ageSexPyramid' },
];

export const defaultFilters: TrendFilterValues = {
  lab: [8],
  parameter: 27,
  region: [42],
  gender: '-1',
  ageRange: [10, 90],
};
