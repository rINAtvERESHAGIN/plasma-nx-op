import { Radios } from 'mui-rff';
import { genderRadioOptions } from '../../lib/constants';

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
          fontSize: 16
        }
      }}
    />
  );
};

export default HumanSexDatasetSpecification;
