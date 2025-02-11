import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch } from '@org/store-redux';
import { type SelectChangeEvent } from '@mui/material/Select';
import { updateComparison } from '@org/store-redux'

interface IProps {
  initValue?: string
}
function PermissionRadioGroup ({ initValue }: IProps): React.ReactNode {
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent): void => {
    const permission = 'any';
    dispatch(updateComparison({ permission: event.target.value }));
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="month"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="day" control={<Radio />} label="День" />
        <FormControlLabel value="week" control={<Radio />} label="Неделя" />
        <FormControlLabel value="month" control={<Radio />} label="Месяц" />
      </RadioGroup>
    </FormControl>
  );
}
export default PermissionRadioGroup;
