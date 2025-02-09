import React from 'react';
import { Field } from 'react-final-form';
import { Slider as MuiSlider } from '@mui/material';
import { NumberFieldContainer } from '../ui.styled';

const NumberField = ({ name, item }): React.ReactNode => (
    <NumberFieldContainer>
        <Field
            name={name}
            render={({ input }) => (
                <MuiSlider
                    {...input}
                    min={item.possible_values.min_value}
                    max={item.possible_values.max_value}
                    step={1}
                    marks={[
                        { value: item.possible_values.min_value, label: `${item.possible_values.min_value}` },
                        { value: item.possible_values.max_value, label: `${item.possible_values.max_value}` }
                    ]}
                    valueLabelDisplay="on"
                />
            )}
        />
    </NumberFieldContainer>
);

export default NumberField;
