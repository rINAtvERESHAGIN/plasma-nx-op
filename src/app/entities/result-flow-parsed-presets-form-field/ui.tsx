import React from 'react';
import StringField from './field-variants/StringField';
import NumberField from './field-variants/NumberField';
import BoolField from './field-variants/BoolField';
import AutocompleteField from './field-variants/AutocompleteField';

const ParsedPresetsFormField = ({ name, item }): React.ReactNode => {
    const renderField = () => {
        switch (item.type) {
            case 'string':
                return <StringField name={name} item={item} />;
            case 'float':
                return <NumberField name={name} item={item} />;
            case 'bool':
                return <BoolField name={name} description={item.description} />;
            case 'object':
                return <AutocompleteField name={name} item={item} />;
            default:
                return null;
        }
    };
    return (
        <>
            <span color="text.secondary">{item.description}</span>
            <div className="nodrag"> {renderField()}</div>
        </>
    );
};

export default ParsedPresetsFormField;
