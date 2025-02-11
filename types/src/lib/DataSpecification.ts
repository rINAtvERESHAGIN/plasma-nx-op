export interface DataSpecification {
  parameter_ids: number[];
  date_min: string;
  date_max: string;
  lab_ids: number[];
  region_ids: number[];
  sex: number;
  age_min: number;
  age_max: number;
  dadata_entry_ids?: number[];
}
