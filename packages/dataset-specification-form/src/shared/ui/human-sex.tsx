import { genderRadioOptions } from '../../trace-form/lib/constants';
import { Radios } from 'mui-rff';

const HumanSexDatasetSpecification = () => {
  return (
    <Radios
      name="humanSex"
      label="Пол"
      data={genderRadioOptions}
      radioGroupProps={{ row: true }}
      formLabelProps={{ sx: { fontSize: 12 } }}
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: 16,
        },
      }}
    />
  );
};

export default HumanSexDatasetSpecification;
