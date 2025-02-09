import React, { useEffect, useMemo, useState } from 'react';
import { useRegionsCore } from '@app/core-data-slice/reducer';
import { type Region } from '@shared/model/regions';
import { type RegionCodes } from '@shared/api/model/RegionCodes';
import { isNil, isEqual } from 'lodash';
import { type RegionAutocompleteProps, type RegionOption, type RegionChangeHandler } from './types';
import { CustomAutocomplete } from '@shared/ui/story-autocomplete/ui';

const getAutocompleteViewRegions = (region: Region): RegionOption => ({ label: region.name_ru, value: region });

export const RegionAutocomplete: React.FunctionComponent<RegionAutocompleteProps> = ({ onRegionChange, value }) => {
  const regions = useRegionsCore().data;
  const [selectedValue, setSelectedValue] = useState<RegionOption[]>([]);

  const autocompleteViewRegions = useMemo<RegionOption[]>(() => {
    return !isNil(regions)
      ? Object.keys(regions).map((regionKey: RegionCodes) => getAutocompleteViewRegions(regions[regionKey]))
      : [];
  }, [regions]);

  const defaultRegionOption = useMemo<RegionOption | null>(() => {
    if (!isNil(regions)) {
      const defaultRegion = regions['RU-MOW'];
      return !isNil(defaultRegion) ? getAutocompleteViewRegions(defaultRegion) : null;
    }
    return null;
  }, [regions]);

  const selectedRegions = useMemo<RegionOption[]>(
    () =>
      !isNil(value) && Array.isArray(value)
        ? (value
            .map((regionId) => autocompleteViewRegions.find((region) => region.value.id === regionId))
            .filter(Boolean) as RegionOption[])
        : [],
    [value, autocompleteViewRegions]
  );

  useEffect(() => {
    if (!isNil(value) && !isEqual(selectedRegions, selectedValue)) {
      setSelectedValue(selectedRegions);
    }
  }, [selectedRegions, selectedValue, value]);

  const handleAutocompleteChange: RegionChangeHandler = (event, newValue) => {
    setSelectedValue(newValue);
    const selectedRegionIds = newValue ? newValue.map((option) => option.value.id) : [];
    onRegionChange(selectedRegionIds);
  };

  useEffect(() => {
    if (!isNil(defaultRegionOption)) {
      setSelectedValue([defaultRegionOption]);
      onRegionChange([defaultRegionOption.value.id]);
    }
  }, [defaultRegionOption, onRegionChange]);

  return (
    <CustomAutocomplete
      options={autocompleteViewRegions}
      value={selectedValue}
      onChange={handleAutocompleteChange}
      multiple={true}
      placeholder="Выберите регион"
    />
  );
};
