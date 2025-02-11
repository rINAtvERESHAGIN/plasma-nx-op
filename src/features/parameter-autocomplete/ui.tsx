import React, { useEffect, useMemo, useState } from 'react';
import { useParametersCore } from '@org/store-redux';
import { isEqual, isNil } from 'lodash';
import { type ParameterAutocompleteProps, type ParameterOption } from './types';
import { getSelectViewParameters } from '../trace-form/lib/getSelectViewParameters';
import { CustomAutocomplete } from '../../shared/ui/story-autocomplete/ui';


export const ParameterAutocomplete: React.FunctionComponent<ParameterAutocompleteProps> = ({
  value,
  onParameterChange
}) => {
  const parameters = useParametersCore().data;
  const [selectedValue, setSelectedValue] = useState<ParameterOption | null>(null);

  const autocompleteViewParameters = useMemo<ParameterOption[]>(() => {
    return !isNil(parameters) ? parameters.map(getSelectViewParameters) : [];
  }, [parameters]);

  const defaultParameterOption = useMemo<ParameterOption | null>(() => {
    if (!isNil(parameters)) {
      const defaultParameter = parameters.find((parameter) => parameter.name_en === 'lymphocytes_percent');
      return !isNil(defaultParameter) ? getSelectViewParameters(defaultParameter) : null;
    }
    return null;
  }, [parameters]);

  useEffect(() => {
    if (!isNil(value)) {
      const foundParameter = autocompleteViewParameters.find((param) => param.value === value);
      if (!isNil(foundParameter) && !isEqual(foundParameter, selectedValue)) {
        setSelectedValue(foundParameter);
      } else if (isNil(foundParameter) && selectedValue !== null) {
        setSelectedValue(null);
      }
    }
  }, [value, autocompleteViewParameters, selectedValue]);

  const handleAutocompleteChange = (event, newValue: ParameterOption | null): void => {
    setSelectedValue(newValue);
    if (!isNil(newValue)) {
      onParameterChange(newValue.value);
    } else {
      onParameterChange(null);
    }
  };

  useEffect(() => {
    if (!isNil(defaultParameterOption)) {
      setSelectedValue(defaultParameterOption);
      onParameterChange(defaultParameterOption.value);
    }
  }, [defaultParameterOption, onParameterChange]);

  return (
    <CustomAutocomplete
      options={autocompleteViewParameters}
      value={selectedValue}
      onChange={handleAutocompleteChange}
      placeholder="Выберите параметр"
    />
  );
};
