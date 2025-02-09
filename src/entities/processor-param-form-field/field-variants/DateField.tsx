import * as React from 'react';
import { DatePicker } from 'mui-rff';

const DateField = ({ name }): React.ReactNode => {
  return <DatePicker label={name} name={name} textFieldProps={{ size: 'small' }} />;
};

export default DateField;
