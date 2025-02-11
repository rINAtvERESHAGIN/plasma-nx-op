import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { Form } from 'react-final-form';
import { FieldContainer } from './ui.styled';
import { parseISO, isValid } from 'date-fns';
import ProcessorParamFormField from '../../entities/processor-param-form-field/ui';

const getDefaultInitialValue = (params) => {
  return Object.entries(params).reduce((acc, [paramKey, paramDetail]) => {
    if (paramDetail.type === 'date' && typeof paramDetail.default === 'string') {
      const parsedDate = parseISO(paramDetail.default);
      acc[paramKey] = isValid(parsedDate) ? parsedDate : null;
    } else {
      acc[paramKey] = paramDetail.default || '';
    }
    return acc;
  }, {});
};

const ProcessorParamsForm = ({ item }): React.ReactNode => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (item?.params) {
      const initialValues = getDefaultInitialValue(item.params);
      setInitialValues(initialValues);
    }
  }, [item]);

  const onSubmit = async (values): void => {};

  return (
    <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            {Object.entries(item.params).map(([paramKey, paramDetail]) => (
              <FieldContainer key={paramKey}>
                <Typography variant="h6" gutterBottom>
                  {paramKey}
                </Typography>
                <ProcessorParamFormField name={paramKey} item={paramDetail} />
              </FieldContainer>
            ))}
            <Button type="submit" variant="contained" color="primary" disabled={submitting || pristine}>
              Submit
            </Button>
          </form>
        )}
      />
  );
};

export default ProcessorParamsForm;
