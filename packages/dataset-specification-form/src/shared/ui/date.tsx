import { DatePicker } from 'mui-rff';
interface IProps {
  name: 'dateMin' | 'dateMax';
  label: string;
}

const DateDatasetSpecification = ({ name, label = '' }: IProps) => {
  return (
    <DatePicker
      label={label}
      name={name}
      textFieldProps={{ size: 'small', variant: 'standard' }}
    />
  );
};

export default DateDatasetSpecification;
