import React, { useEffect, useMemo, useState } from 'react';
import { useLabsCore } from '@org/store-redux';
import { isEqual, isNil } from 'lodash';
import { type AutocompleteChange, type LabAutocompleteProps, type LabOption } from './types';
import { getSelectViewLabs } from '../trace-form/lib/getSelectViewParameters';
import { CustomAutocomplete } from '../../shared/ui/story-autocomplete/ui';

export const LabAutocomplete: React.FunctionComponent<LabAutocompleteProps> = ({ value, onLabChange }) => {
  const labs = useLabsCore().data;
  const [selectedValue, setSelectedValue] = useState<LabOption[]>([]);

  const autocompleteViewLabs = useMemo<LabOption[]>(() => {
    return !isNil(labs) ? labs.map(getSelectViewLabs) : [];
  }, [labs]);

  const defaultLabOptions = useMemo<LabOption[]>(() => {
    if (!isNil(labs)) {
      const defaultLabs = labs.filter((lab) => ['Инвитро'].includes(lab.name_ru));
      return defaultLabs.map(getSelectViewLabs);
    }
    return [];
  }, [labs]);

  const selectedLabs = useMemo<LabOption[]>(() => {
    if (!isNil(value) && Array.isArray(value)) {
      return value
        .map((labId) => autocompleteViewLabs.find((lab) => lab.value === labId))
        .filter(Boolean) as LabOption[];
    }
    return [];
  }, [value, autocompleteViewLabs]);

  useEffect(() => {
    if (!isNil(value) && !isEqual(selectedLabs, selectedValue)) {
      setSelectedValue(selectedLabs);
    }
  }, [selectedLabs, selectedValue, value]);

  const handleAutocompleteChange: AutocompleteChange = (event, newValue) => {
    setSelectedValue(newValue);
    const selectedLabIds = newValue.map((option) => option.value);
    onLabChange(selectedLabIds);
  };

  useEffect(() => {
    if (!isNil(defaultLabOptions)) {
      setSelectedValue(defaultLabOptions);
      onLabChange(defaultLabOptions.map((option) => option.value));
    }
  }, [defaultLabOptions, onLabChange]);

  return (
    <CustomAutocomplete
      options={autocompleteViewLabs}
      value={selectedValue}
      onChange={handleAutocompleteChange}
      multiple={true}
      placeholder="Выберите лабораторию"
    />
  );
};
