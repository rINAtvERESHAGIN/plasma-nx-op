import React from 'react';
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';

interface WordStatFrequencyProps {
  frequency: string;
  setFrequency: (value: string) => void;
}

const WordStatFrequency: React.FC<WordStatFrequencyProps> = ({ frequency, setFrequency }) => {
  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFrequency((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset" sx={{ flex: '1 1 150px' }}>
      <FormLabel component="legend">Разрешение</FormLabel>
      <RadioGroup row value={frequency} onChange={handleFrequencyChange}>
        <FormControlLabel value="daily" control={<Radio />} label="День" />
        <FormControlLabel value="weekly" control={<Radio />} label="Неделя" />
      </RadioGroup>
    </FormControl>
  );
};

export default WordStatFrequency;
