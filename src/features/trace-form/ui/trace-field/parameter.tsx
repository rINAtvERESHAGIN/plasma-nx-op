import * as React from 'react';

import { type AutocompleteData, Autocomplete } from 'mui-rff';
import { useEffect, useState } from 'react';
import { useParametersCore } from '@org/store-redux';
import { isNil } from 'lodash';
import { getAutoCompleteViewParameters } from '../../lib/getSelectViewParameters';

const ParameterDatasetSpecification: React.FunctionComponent = () => {
  const [autocompleteViewParameters, setAutoCompleteViewParameters] = useState<AutocompleteData[] | undefined>(
    undefined
  );
  const parameters = useParametersCore().data;

  useEffect(() => {
    if (!isNil(parameters)) {
      setAutoCompleteViewParameters(() => parameters.map((parameter) => getAutoCompleteViewParameters(parameter)));
    }
  }, [parameters]);

  if (!isNil(autocompleteViewParameters)) {
    return (
      <React.Fragment>
        <Autocomplete
          name="parameters"
          label="Параметры"
          size="small"
          multiple
          textFieldProps={{ variant: 'standard' }}
          options={autocompleteViewParameters}
          disableCloseOnSelect
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          getOptionValue={(option) => option.value}
          getOptionLabel={(option: string | AutocompleteData) => (option as AutocompleteData).label}
          renderOption={(props, option) => (
            <li key={option.label} {...props}>
              {option.label}
            </li>
          )}
        />
      </React.Fragment>
    );
  }

  return null;
};

export default ParameterDatasetSpecification;
