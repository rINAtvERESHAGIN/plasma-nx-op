import React from 'react';
import { Field } from 'react-final-form';
import AgeRangeSlider from '@shared/ui/age-range-slider/ui';

interface IProps {}

const AgeDatasetSpecification = ({}: IProps) => {
  return <Field name='ageRange'>{({ input, meta }) => <AgeRangeSlider input={input} meta={meta} />}</Field>;
};

export default AgeDatasetSpecification;
