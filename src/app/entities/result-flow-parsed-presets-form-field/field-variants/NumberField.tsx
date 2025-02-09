import React, { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { Slider as MuiSlider } from '@mui/material';
import { NumberFieldContainer } from '../ui.styled';

const NumberField = ({ name, item }): React.ReactNode => {
    const [sliderData, setSliderData] = useState<{ min: number; max: number } | undefined>(undefined);

    useEffect(() => {
        if (item.possible_values) {
            setSliderData({
                min: item.possible_values.min_value,
                max: item.possible_values.max_value
            });
        }
    }, [item.possible_values]);

    if (sliderData !== undefined) {
        return (
            <NumberFieldContainer>
                <Field
                    name={name}
                    render={({ input }) => (
                        <MuiSlider
                            {...input}
                            value={typeof input.value === 'number' ? input.value : 0}
                            min={sliderData.min}
                            max={sliderData.max}
                            step={1}
                            marks={[
                                { value: sliderData.min, label: `${sliderData.min}` },
                                { value: sliderData.max, label: `${sliderData.max}` }
                            ]}
                            valueLabelDisplay="on"
                        />
                    )}
                />
            </NumberFieldContainer>
        );
    }
    return null;
};

export default NumberField;
