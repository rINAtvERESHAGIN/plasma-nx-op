export interface TranslatedFilterValues {
  lab: string;
  parameter: string | number;
  region: string;
  gender: string;
  minAge: number;
  maxAge: number;
}

export interface CohortSelectedFilterCardsProps {
  filterSelections: TranslatedFilterValues[];
  onDelete: (index: number) => void;
}