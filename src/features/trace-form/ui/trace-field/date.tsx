import { ruRU } from '@mui/x-date-pickers/locales';
import { DatePicker } from 'mui-rff';

interface IProps {
  name: 'dateMin' | 'dateMax';
  label: string;
}

const DateDatasetSpecification: React.FunctionComponent<IProps> = ({ name, label = '' }) => {
  return (
    <DatePicker
      label={label}
      locale={ruRU}
      format="dd/MM/yyyy"
      name={name}
      textFieldProps={{ size: 'small', variant: 'standard' }}
    />
  );
};

export default DateDatasetSpecification;
