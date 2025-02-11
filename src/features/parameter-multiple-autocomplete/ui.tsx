import React, { useEffect, useMemo, useState } from 'react';
import { useParametersCore } from '@org/store-redux';
import { getSelectViewParameters } from '../../trace-form/lib/getSelectViewParameters';
import { isEqual, isNil } from 'lodash';
import { type AutocompleteChange, type ParameterAutocompleteProps, type ParameterOption } from './types';
import { CustomAutocomplete } from '@shared/ui/story-autocomplete/ui';

export const ParameterMultipleAutocomplete: React.FunctionComponent<ParameterAutocompleteProps> = ({
  value,
  onParameterChange
}) => {
  const parameters = useParametersCore().data;
  const [selectedValue, setSelectedValue] = useState<ParameterOption[]>([]);

  const autocompleteViewParameters = useMemo<ParameterOption[]>(() => {
    return !isNil(parameters) ? parameters.map(getSelectViewParameters) : [];
  }, [parameters]);

  const defaultParameterOptions = useMemo<ParameterOption[]>(() => {
    if (!isNil(parameters)) {
      const defaultParameters = parameters.filter((parameter) => ['lymphocytes_percent'].includes(parameter.name_en));
      return defaultParameters.map(getSelectViewParameters);
    }
    return [];
  }, [parameters]);

  const selectedParameters = useMemo<ParameterOption[]>(
    () =>
      !isNil(value) && Array.isArray(value)
        ? (value
            .map((parameterId) => autocompleteViewParameters.find((parameter) => parameter.value === parameterId))
            .filter(Boolean) as ParameterOption[])
        : [],
    [value, autocompleteViewParameters]
  );

  useEffect(() => {
    if (!isNil(value) && !isEqual(selectedParameters, selectedValue)) {
      setSelectedValue(selectedParameters);
    }
  }, [selectedParameters, selectedValue, value]);

  const handleAutocompleteChange: AutocompleteChange = (event, newValue) => {
    setSelectedValue(newValue);
    onParameterChange(newValue.map((item) => item.value));
  };

  useEffect(() => {
    if (defaultParameterOptions.length > 0) {
      setSelectedValue(defaultParameterOptions);
      onParameterChange(defaultParameterOptions.map((option) => option.value));
    }
  }, [defaultParameterOptions, onParameterChange]);

  return (
    <CustomAutocomplete
      options={autocompleteViewParameters}
      value={selectedValue}
      onChange={handleAutocompleteChange}
      multiple={true}
      placeholder="Выберите параметр"
    />
  );
};
