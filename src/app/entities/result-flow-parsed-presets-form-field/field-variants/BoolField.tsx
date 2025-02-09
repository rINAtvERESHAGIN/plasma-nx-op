import React from 'react';
import { Field } from 'react-final-form';
import { Checkbox, FormControlLabel } from '@mui/material';
import { BoolFieldContainer } from '../ui.styled';

const BoolField = ({ name, description }): React.ReactNode => (
    <Field
        name={name}
        type="checkbox"
        render={({ input }) => (
            <BoolFieldContainer>
                <FormControlLabel control={<Checkbox {...input} checked={input.value} />} label={description} />
            </BoolFieldContainer>
        )}
    />
);

export default BoolField;
