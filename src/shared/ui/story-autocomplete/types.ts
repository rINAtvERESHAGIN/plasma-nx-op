import { SelectProps, type SelectChangeEvent } from '@mui/material';

export type SelectedValue = string | number | (string | number)[];

export interface IProps {
  options: { label: string; value: string | number }[];
  value: string | number | (string | number)[];
  onChange: (event: SelectChangeEvent<SelectedValue>) => void;
  multiple?: boolean;
  placeholder?: string;
  otherProps?: SelectProps;
}
