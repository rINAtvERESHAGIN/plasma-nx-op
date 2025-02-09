import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

interface WordStatAutocompleteProps {
  data: string[];
  selectedPhrase: string | null;
  setSelectedPhrase: (value: string | null) => void;
}

const WordStatAutocomplete: React.FC<WordStatAutocompleteProps> = ({ data, selectedPhrase, setSelectedPhrase }) => {
  const handlePhraseChange = (event: React.ChangeEvent<unknown>, value: string | null): void => {
    setSelectedPhrase(value);
  };

  return (
    <Autocomplete
      options={data}
      value={selectedPhrase}
      onChange={handlePhraseChange}
      renderInput={(params) => <TextField {...params} label="Выберите слово или словосочетание" variant="outlined" />}
      sx={{ flex: '1 1 300px' }}
    />
  );
};

export default WordStatAutocomplete;
