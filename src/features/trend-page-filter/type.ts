export interface TrendFilterValues {
  lab: number[];
  parameter: number | null;
  region: number[];
  gender: string;
  ageRange: [number, number];
}

export interface TrendFilterOptionsProps {
  filterValues: TrendFilterValues;
  onSave: (values: TrendFilterValues) => void;
}
