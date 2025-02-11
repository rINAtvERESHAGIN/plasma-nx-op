import { useRegionsCore } from '@org/store-redux';
import { isNil } from 'lodash';
import { Autocomplete, type AutocompleteData } from 'mui-rff';
import React, { useEffect, useState } from 'react';
import { getAutocompleteViewRegions } from '../../lib/getSelectViewParameters';

const RegionDatasetSpecification: React.FunctionComponent<unknown> = () => {
  const [autocompleteViewRegions, setAutoCompleteViewRegions] = useState<AutocompleteData[] | undefined>(undefined);
  const regions = useRegionsCore().data;

  useEffect(() => {
    if (regions != null) {
      setAutoCompleteViewRegions(() =>
        Object.keys(regions).map((regionKey) => getAutocompleteViewRegions(regions[regionKey as IsoCode]))
      );
    }
  }, [regions]);

  if (isNil(autocompleteViewRegions)) return null;

  return (
    <Autocomplete
      name="selectedRegion"
      label="Регионы"
      size="small"
      textFieldProps={{ variant: 'standard' }}
      multiple
      options={autocompleteViewRegions}
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
  );
};

export default RegionDatasetSpecification;
