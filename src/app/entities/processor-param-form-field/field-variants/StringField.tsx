import * as React from 'react';
import { Select, type SelectData } from 'mui-rff';
import { useEffect, useState } from 'react';

const getSelectViewParam = (item) => {
    return { label: item, value: item };
};

const StringField = ({ name, item }): React.ReactNode => {
    const [selectData, setSelectData] = useState<SelectData[] | undefined>(undefined);

    useEffect(() => {
        if (item.possible_values != null) {
            setSelectData(item.possible_values.map((value) => getSelectViewParam(value)));
        }
    }, [item.possible_values]);

    if (selectData != null) {
        return <Select name={name} data={selectData} size="small" />;
    }

    return null;
};

export default StringField;
