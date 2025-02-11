import React from 'react';
import { useAppDispatch } from '@org/store-redux';
import { setHumanSex } from '@shared/model/system-operator';
import RadioButtonsGroup from '@shared/ui/radio-group/ui';
import Box from '@mui/material/Box';
import { useActiveHumanSex } from '@shared/model/useActiveHumanSex';

const radioOptions = [
  { label: 'Муж', value: '0' },
  { label: 'Жен', value: '1' },
  { label: 'Любой', value: '-1' }
];

function GenderRadioGroup() {
  const dispatch = useAppDispatch();
  const humanSex = useActiveHumanSex();

  const handleGenderChange = (value: string) => {
    dispatch(setHumanSex(value));
  };

  return (
    <Box sx={{ width: '70%' }}>
      <RadioButtonsGroup label="Пол:" data={radioOptions} onChange={handleGenderChange} selectedValue={humanSex} />
    </Box>
  );
}

export default GenderRadioGroup;
