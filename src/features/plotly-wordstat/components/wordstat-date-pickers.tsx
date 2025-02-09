import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box } from '@mui/material';

interface WordStatDatePickersProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

const WordStatDatePickers: React.FC<WordStatDatePickersProps> = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleClear = (field: 'start' | 'end'): void => {
    if (field === 'start') {
      setStartDate(null);
    } else {
      setEndDate(null);
    }
  };

  const handleStartDateChange = (newValue: Date | null): void => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue: Date | null): void => {
    setEndDate(newValue);
  };

  const handleStartDateClear = (): void => {
    handleClear('start');
  };

  const handleEndDateClear = (): void => {
    handleClear('end');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <DatePicker
          label="Начальная дата"
          value={startDate}
          onChange={handleStartDateChange}
          slotProps={{
            field: {
              clearable: true,
              onClear: handleStartDateClear
            }
          }}
          sx={{ flex: '1 1 100px' }}
        />
        <DatePicker
          label="Конечная дата"
          value={endDate}
          onChange={handleEndDateChange}
          slotProps={{
            field: {
              clearable: true,
              onClear: handleEndDateClear
            }
          }}
          sx={{ flex: '1 1 100px' }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default WordStatDatePickers;
