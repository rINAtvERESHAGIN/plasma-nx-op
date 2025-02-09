import React from 'react';
import RadioButtonsGroup from '@shared/ui/radio-group/ui';
import type { TrendFilterOptionsProps, TrendFilterValues } from './type';
import { radioOptions } from './constants.tsx';
import { Container, LabeledAutocomplete, Label, Title, StyledButton } from './ui.styled';
import { AgeOptionGroup } from '@features/cohort-age-option-group/ui.tsx';
import { AreaOptionGroup } from '@features/cohort-area-option-group/ui.tsx';
import { Form, Field } from 'react-final-form';
import { LabAutocompleteWithTags } from '@features/lab-tags-autocomplete/ui.tsx';
import { ParameterAutocompleteWithTags } from '@features/parameter-tags-autocomplete/ui.tsx';

export const TrendFilterOptions: React.FunctionComponent<TrendFilterOptionsProps> = ({ filterValues, onSave }) => {
  const onSubmit = (values: TrendFilterValues): void => {
    onSave(values);
  };

  return (
    <Form
      initialValues={filterValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine, submitting }) => (
        <Container>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <Title>Когорта</Title>
                <div>
                  <Field name='gender'>
                    {({ input }) => (
                      <RadioButtonsGroup
                        label='Пол:'
                        data={radioOptions}
                        selectedValue={input.value}
                        onChange={input.onChange}
                      />
                    )}
                  </Field>
                  <Field name='ageRange'>
                    {({ input }) => <AgeOptionGroup ageValue={input.value} onAgeChange={input.onChange} />}
                  </Field>
                  <Field name='region'>
                    {({ input }) => <AreaOptionGroup value={input.value} onRegionChange={input.onChange} />}
                  </Field>
                </div>
              </div>

              <div>
                <Title>Набор данных</Title>
                <div>
                  <Field name='lab'>
                    {({ input }) => (
                      <LabeledAutocomplete>
                        <Label>Лаборатория</Label>
                        <LabAutocompleteWithTags value={input.value} onLabChange={input.onChange} />
                      </LabeledAutocomplete>
                    )}
                  </Field>
                  <Field name='parameter'>
                    {({ input }) => (
                      <LabeledAutocomplete>
                        <Label>Параметр</Label>
                        <ParameterAutocompleteWithTags value={input.value} onParameterChange={input.onChange} />
                      </LabeledAutocomplete>
                    )}
                  </Field>
                </div>
              </div>
            </div>
            <div>
              <StyledButton type='submit' disabled={pristine || submitting}>
                Применить
              </StyledButton>
            </div>
          </form>
        </Container>
      )}
    />
  );
};
