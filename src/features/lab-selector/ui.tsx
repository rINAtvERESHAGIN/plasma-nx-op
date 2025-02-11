import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { type SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '@org/store-redux';
import { useEffect } from 'react';
import Selector, { type ISelectorDate } from '@shared/ui/selector/ui';
import { setMenuProps } from '@shared/ui/selector/styles';
import { updateComparison } from '@org/store-redux'
import { setLab } from '@shared/model/system-operator';
import { useActiveLab } from '@shared/model/useActiveLab';
import { useLabsCore } from '@app/core-data-slice/reducer';

const LabSelector = (): React.ReactNode => {
  const labs = useLabsCore();
  const dispatch = useAppDispatch();
  const [menuItems, setMenuItems] = React.useState<ISelectorDate[] | undefined>(undefined);

  const lab = useActiveLab();

  const handleChange = (event: SelectChangeEvent<number>): void => {
    dispatch(setLab(event.target.value));
    dispatch(updateComparison({ selectedLab: event.target.value }));
  };

  useEffect(() => {
    if (labs?.data !== undefined) {
      setMenuItems(() => labs.data.map((value) => ({ label: value.name_ru, value: value.id })));
    }
  }, [labs]);

  return (
    <FormControl sx={{ m: 1, minWidth: '30%', width: '100%', backgroundColor: '#f8f8f8' }}>
      <InputLabel id="lab-selector-label">Лаборатория</InputLabel>
      <Selector
        data={menuItems}
        labelId="lab-current-selector"
        label="Лаборатория"
        onChange={handleChange}
        MenuProps={setMenuProps(250)}
        // sx={{ flex: '1' }}
        value={lab.data}
      />
    </FormControl>
  );
};

export default LabSelector;
