import React from 'react';
import type { TrendFilterOptionsProps, TrendFilterValues } from './type.ts';
import { Form, Field } from 'react-final-form';
import { isEqual } from 'lodash';
import { Container, Label, LabeledAutocomplete, StyledButton, Title } from './ui.styled.js';
import RadioButtonsGroup from '../../shared/ui/radio-group/ui.js';
import { AgeOptionGroup } from '../cohort-age-option-group/ui.js';
import { AreaOptionGroup } from '../cohort-area-option-group/ui.js';
import { LabAutocompleteWithTags } from '../lab-tags-autocomplete/ui.js';
import { ParameterAutocompleteWithTags } from '../parameter-tags-autocomplete/ui.js';
import { radioOptions } from './constants.js';

export const CohortFilterOptions: React.FunctionComponent<TrendFilterOptionsProps> = ({
  filterValues,
  onSave,
  filterSelections,
}) => {
  const onSubmit = (values: TrendFilterValues): void => {
    onSave(values);
  };

  const isDuplicate = (values: TrendFilterValues): boolean =>
    filterSelections.some((selectionItem) => isEqual(selectionItem, values));

  return (
    <Form
      initialValues={filterValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine, submitting, values }) => {
        const duplicate = isDuplicate(values);
        return (
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
                <StyledButton type='submit' disabled={pristine || submitting || duplicate}>
                  Добавить
                </StyledButton>
              </div>
            </form>
          </Container>
        );
      }}
    />
  );
};
