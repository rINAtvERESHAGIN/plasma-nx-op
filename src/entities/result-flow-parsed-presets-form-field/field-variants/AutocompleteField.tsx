import React, { useEffect, useState } from 'react';
import { Autocomplete, type AutocompleteData } from 'mui-rff';
import { AutocompleteFieldContainer } from '../ui.styled';

const getAutocompleteViewParam = (item): AutocompleteData => {
    return { label: item, value: item };
};

const AutocompleteField = ({ name, item }): React.ReactNode => {
    const [autocompleteData, setAutocompleteData] = useState<AutocompleteData[] | undefined>(undefined);

    useEffect(() => {
        if (item.possible_values) {
            setAutocompleteData(item.possible_values.map(getAutocompleteViewParam));
        }
    }, [item.possible_values]);

    if (autocompleteData != null) {
        return (
            <AutocompleteFieldContainer>
                <Autocomplete
                    name={name}
                    label="Label если надо "
                    size="small"
                    multiple
                    options={autocompleteData}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <li key={option.value} {...props}>
                            {option.label}
                        </li>
                    )}
                    disableCloseOnSelect
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                />
            </AutocompleteFieldContainer>
        );
    }
};

export default AutocompleteField;
