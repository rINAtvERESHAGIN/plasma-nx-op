import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { type SelectProps } from '@mui/material/Select';
import { useAppDispatch } from '@app/store';
import { useEffect } from 'react';
import { setParameter } from '@shared/model/system-operator';
import { useActiveParameter } from '@shared/model/useActiveParameter';
import { setMenuProps } from '@shared/ui/selector/styles';
import Selector, { type ISelectorDate } from '@shared/ui/selector/ui';
import { updateComparison } from '@pages/traces/model';
import { useParametersCore } from '@app/core-data-slice/reducer';
import { type Parameter } from '@shared/api/model/Parameter';

const getParameterMenuItems = (parameters: Parameter[]): ISelectorDate[] =>
  parameters.map((value) => ({
    label: value.name_ru,
    value: value.id,
    description: `(ID: ${value.id}) ${value.description_ru}`
  }));

const ParameterSelector = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const parameters = useParametersCore();
  const parameter = useActiveParameter();
  const [menuItems, setMenuItems] = React.useState<ISelectorDate[] | undefined>(undefined);

  const handleChange: SelectProps<number>['onChange'] = (event) => {
    dispatch(setParameter(event.target.value));
    dispatch(updateComparison({ selectedParameter: event.target.value }));
  };

  useEffect(() => {
    if (parameters?.data !== undefined && menuItems === undefined) {
      setMenuItems(getParameterMenuItems(parameters.data));
    }
  }, [parameters]);

  return (
    <FormControl sx={{ m: 1, minWidth: '30%', width: '100%', backgroundColor: '#f8f8f8' }}>
      <InputLabel id="select">Параметр</InputLabel>
      <Selector
        data={menuItems}
        labelId="parameter-current-selector"
        label="Параметр"
        onChange={handleChange}
        MenuProps={setMenuProps(550)}
        value={parameter.data}
      />
    </FormControl>
  );
};

export default ParameterSelector;
