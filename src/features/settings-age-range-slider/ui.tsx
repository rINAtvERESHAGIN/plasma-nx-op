import React, { useState, useEffect } from 'react';
import RangeSlider from '../../shared/ui/range-slider/ui';
import { useAppDispatch } from '@org/store-redux';
import { Typography } from '@mui/material';
import { setAgeRange } from '../../shared/model/system-operator';
import Box from '@mui/material/Box';
import { useActiveAgeRange } from '../../shared/model/useActiveAgeRange';
import useDebounce from '../../entities/timeline-geo-map-slider/use-debounce';


const SettingsAgeRangeSlider: React.FC = ( ) => {
  const dispatch = useAppDispatch();
  const ageRange = useActiveAgeRange(); 
  const [value, setValue] = useState<number[]>(ageRange);
  const debounceValue = useDebounce<number[]>(value, 1000);
    
  const handleAgeRangeChange = (newValue: number[]) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (debounceValue !== undefined) {
      dispatch(setAgeRange(value));
    }
  }, [debounceValue]);
  
  return (
    <Box sx={{ width: '100%', padding: '5px 12px 0 12px' }}>        
      <Typography>Возвраст: от {ageRange[0]} до {ageRange[1]}</Typography>
      <RangeSlider
        min={0}
        max={100}
        step={5}
        marks
        value={value}
        onChange={handleAgeRangeChange}
      />
    </Box>
  );
};

export default SettingsAgeRangeSlider;