import { permissionRadioOptions } from '@features/trace-form/lib/constants';
import { Radios } from 'mui-rff';
import React from 'react';

const PermissionDatasetSpecification: React.FunctionComponent<any> = () => {
  return (
    <Radios
      name="permission"
      formLabelProps={{ sx: { fontSize: 12 } }}
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: 16
        }
      }}
      label="Разрешение"
      radioGroupProps={{ row: true }}
      data={permissionRadioOptions}
      size="small"
    />
  );
};

export default PermissionDatasetSpecification;
