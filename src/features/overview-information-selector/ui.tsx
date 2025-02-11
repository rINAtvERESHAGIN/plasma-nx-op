import React, { useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { type SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '@org/store-redux';
import Selector from '@shared/ui/selector/ui';
import { setMenuProps } from '@shared/ui/selector/styles';
import { menuItemsOverviewInformation } from '@features/overview-information-selector/lib/constants';
import { setOverviewInformation, useOverviewInformation } from '@shared/model/system-operator';

const OverviewInformationSelector = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const overviewInformation = useOverviewInformation();

  const handleChange = useCallback((event: SelectChangeEvent) => {
    dispatch(setOverviewInformation(event.target.value));
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: '30%', width: '100%', backgroundColor: '#f8f8f8' }}>
      <InputLabel id="select">Обзорная информация</InputLabel>
      <Selector
        data={menuItemsOverviewInformation}
        labelId="overview-information-current-selector"
        label="Обзорная информация"
        onChange={handleChange}
        MenuProps={setMenuProps(250)}
        value={overviewInformation}
      />
    </FormControl>
  );
};

export default OverviewInformationSelector;
