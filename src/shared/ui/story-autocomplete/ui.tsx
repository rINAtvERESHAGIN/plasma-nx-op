import React, { useState } from 'react';
import { Autocomplete, type AutocompleteProps, TextField, ThemeProvider, Checkbox } from '@mui/material';
import { theme } from './ui.styled';
import { CaretDown } from '@shared/draft-icons/caret-down/CaretDown';

interface IOption {
  label: string;
  value: string | number;
}

interface IProps extends Omit<AutocompleteProps<IOption, boolean, boolean, boolean>, 'renderInput'> {
  options: IOption[];
  value: string | string[];
  onChange: (event: React.SyntheticEvent, value: IOption | IOption[] | null) => void;
  multiple?: boolean;
  placeholder?: string;
}

export const CustomAutocomplete = ({ options, value, onChange, multiple = false, placeholder, ...props }: IProps) => {
  const hasSelected = multiple ? Array.isArray(value) && value.length > 0 : Boolean(value);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        {...props}
        multiple={multiple}
        limitTags={2}
        value={multiple ? (Array.isArray(value) ? value : []) : value}
        options={options}
        onChange={onChange}
        // renderInput={(params) => <TextField {...params} placeholder={!hasSelected ? placeholder : ''} />}
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            {multiple && <Checkbox checked={selected} />}
            {option.label}
          </li>
        )}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disableClearable
        popupIcon={<CaretDown />}
        disableCloseOnSelect={multiple}
      />
    </ThemeProvider>
  );
};
