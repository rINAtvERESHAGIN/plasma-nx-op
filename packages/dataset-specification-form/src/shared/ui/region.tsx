import { useRegionsCore } from '@org/store-redux';
import { getAutocompleteViewRegions } from '../../trace-form/lib/getSelectViewParameters';
import { isNil } from 'lodash';
import { Autocomplete, type AutocompleteData } from 'mui-rff';
import React, { useEffect, useState } from 'react';

const RegionDatasetSpecification: React.FunctionComponent = () => {
  const regions = useRegionsCore().data;

  const [autocompleteViewRegions, setAutoCompleteViewRegions] = useState<
    AutocompleteData[] | undefined
  >(undefined);

  useEffect(() => {
    if (!isNil(regions)) {
      setAutoCompleteViewRegions(() =>
        Object.keys(regions).map((regionKey) =>
          getAutocompleteViewRegions(regions[regionKey as IsoCode]),
        ),
      );
    }
  }, [regions]);

  if (isNil(autocompleteViewRegions)) return null;

  return (
    <Autocomplete
      label="Регионы"
      name="selectedRegion"
      size="small"
      multiple
      disableCloseOnSelect
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={autocompleteViewRegions}
      getOptionValue={(option) => option.value}
      textFieldProps={{
        variant: 'standard',
      }}
    />
  );
};

export default RegionDatasetSpecification;
