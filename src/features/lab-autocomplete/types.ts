export interface LabOption {
  label: string;
  value: number;
}

export type AutocompleteChange = (event: React.SyntheticEvent, newValue: LabOption | null) => void;

export interface LabAutocompleteProps {
  value?: number[];
  onLabChange: (labId: number[]) => void;
}
