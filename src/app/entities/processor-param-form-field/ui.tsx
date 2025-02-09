import React from 'react';
import { Divider } from '@mui/material';
import BoolField from './field-variants/BoolField';
import StringField from './field-variants/StringField';
import NumberField from './field-variants/NumberField';
import DateField from './field-variants/DateField';
import { ParamFormDescription } from './ui.styled';

const ProcessorParamFormField = ({ name, item }): React.ReactNode => {
    const renderField = () => {
        switch (item.type) {
            case 'bool':
                return <BoolField name={name} description={item.description} />;
            case 'str':
                return <StringField name={name} item={item} />;
            case 'date':
                return <DateField name={name} />;
            case 'int':
            case 'float':
                return <NumberField name={name} item={item} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Divider />
            <ParamFormDescription color="text.secondary">{item.description}</ParamFormDescription>
            {renderField()}
        </>
    );
};

export default ProcessorParamFormField;
