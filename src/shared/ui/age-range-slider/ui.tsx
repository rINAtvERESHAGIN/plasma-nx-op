import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { updateComparison, useAppDispatch } from '@org/store-redux';
import { type FieldInputProps, type FieldMetaState } from 'react-final-form';
import { FormHelperText, InputLabel } from '@mui/material';
import useDebounce from '../../../entities/timeline-geo-map-slider/use-debounce';

function valuetext(value: number): string {
  return `${value}`;
}

interface IProps {
  initValue?: number[];
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
}

const AgeRangeSlider = ({ initValue, input, meta }: IProps): React.ReactNode => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<number[]>([10, 50]);
  const debounceValue = useDebounce<number[]>(value, 1000);

  useEffect(() => {
    if (debounceValue !== undefined) {
      input.onChange(value);
    }
  }, [debounceValue]);

  const handleChange = (_: Event, newValue: number | number[]): void => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    if (debounceValue !== undefined) {
      const [ageStart, ageFinish] = debounceValue;
      dispatch(updateComparison({ ageRange: { ageStart, ageFinish } }));
    }
  }, [debounceValue]);

  return (
    <Box>
      {/* <FormControl> */}
      <InputLabel htmlFor="age-range" sx={{ fontSize: 12 }}>
        Возраст
      </InputLabel>
      <Slider
        id="age-range"
        valueLabelDisplay="auto"
        getAriaLabel={() => 'Age range'}
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
      />
      {meta?.error && meta.touched && (
        <FormHelperText error id="my-helper-text">
          {meta.error}
        </FormHelperText>
      )}
      {/* </FormControl> */}
    </Box>
  );
};
export default AgeRangeSlider;
