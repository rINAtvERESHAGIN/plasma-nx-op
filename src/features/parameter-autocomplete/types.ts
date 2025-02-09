export interface ParameterOption {
  label: string;
  value: number;
}
export interface ParameterAutocompleteProps {
  value?: number | null;
  onParameterChange: (parameterId: number | null) => void;
}
