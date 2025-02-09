import React from 'react';
import { Autocomplete, TextField, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { isNil } from 'lodash';

interface OptionType {
  label: string;
  value: any;
  description?: string;
}

interface AutocompleteProps {
  options: OptionType[];
  label?: string;
  onChange: (event: React.SyntheticEvent, value: OptionType | null) => void;
  value: OptionType | null;
}

export const SharedAutocomplete: React.FC<AutocompleteProps> = ({ options, label, onChange, value }) => {
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      options={options}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <li {...props}>
          {option.label}
          {!isNil(option.description) && (
            <Tooltip placement="right-start" title={option.description}>
              <IconButton size="small" sx={{ ml: 1 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
      sx={{ width: '100%' }}
    />
  );
};
