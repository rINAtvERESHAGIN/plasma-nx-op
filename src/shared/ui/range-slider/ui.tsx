import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider, { type SliderProps } from '@mui/material/Slider';

export interface RangeSliderProps extends Omit<SliderProps, 'onChange'> {
  onChange: (newValue: number[]) => void;
}

const valuetext = (value: number): string => {
  return `${value}`;
};

const RangeSlider: React.FC<RangeSliderProps> = ({ onChange, ...sliderProps }) => {
  const [value, setValue] = useState<number[]>([sliderProps.min || 0, sliderProps.max || 100]);

  const handleChange = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number[]);
    onChange(newValue as number[]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        sx={{ color: '#414961' }}
        {...sliderProps}
      />
    </Box>
  );
};

export default RangeSlider;
