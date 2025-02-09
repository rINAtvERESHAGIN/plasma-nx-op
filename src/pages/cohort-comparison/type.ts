export interface TrendFilterValues {
  lab: number[];
  parameter: number;
  region: number[];
  gender: string;
  ageRange: [number, number];
}

export interface TranslatedFilterValues {
  lab: string;
  parameter: string | number;
  region: string;
  gender: string;
  minAge: number;
  maxAge: number;
}
