export interface ParameterOption {
  label: string;
  value: number;
}

export type AutocompleteChange = (event: React.SyntheticEvent, newValue: ParameterOption | null) => void;

export interface ParameterAutocompleteProps {
  value?: number[];
  onParameterChange: (parameterId: number[]) => void;
}
