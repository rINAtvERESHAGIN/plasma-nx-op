import React from 'react';
import { Field } from 'react-final-form';
import { Checkbox, FormControlLabel } from '@mui/material';

const BoolField = ({ name, description }): React.ReactNode => (
    <Field
        name={name}
        type="checkbox"
        render={({ input }) => (
            <FormControlLabel control={<Checkbox {...input} checked={input.value} />} label={description} />
        )}
    />
);

export default BoolField;
