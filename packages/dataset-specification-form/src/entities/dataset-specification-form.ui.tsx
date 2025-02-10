import { Button } from '@mui/material';
import { type IPropsDatasetSpecification } from 'types';
import { traceValidation } from '../shared/services/validation';
import { type FormApi } from 'final-form';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Form } from 'react-final-form';
import {
  Content,
  FieldContainer,
  ActionContainer,
} from '../shared/styled/dataset-specification-form.styled';
import createDecorator from 'final-form-focus';
import { isNil } from 'lodash';
import { fields } from '../shared/constants/fields';

interface IProps extends IPropsDatasetSpecification {}

const focusOnError = createDecorator();

export const DatasetSpecificationForm: React.FunctionComponent<IProps> =
  forwardRef(
    (
      { id, externalSubmit, initialValue, traceStatus, externalSubmitEditing },
      ref,
    ) => {
      const [formValue, setFormValue] = useState(undefined);

      const formRef = useRef(null);

      useImperativeHandle(ref, () => ({
        submit: () => {
          if (formRef.current) {
            formRef.current.submit();
          }
        },
        getState: () => {
          if (formRef.current) {
            return formRef.current.getState();
          }
          return {};
        },
      }));

      const onSubmit = (values): void => {
        if (traceStatus === 'adding') {
          externalSubmit(values);
        }

        if (traceStatus === 'editing') {
          externalSubmitEditing(values);
        }
      };

      const onReset = (form: FormApi) => () => {
        form.reset();
      };

      const subscription = { submitting: true };

      useEffect(() => {
        if (!isNil(initialValue)) {
          const conversionKeys = ['dateMax', 'dateMin'];
          const formattedFormValue = Object.keys(initialValue).reduce<object>(
            (acc, valueKey) => {
              const value = initialValue[valueKey];
              if (conversionKeys.includes(valueKey)) {
                if (valueKey === 'dateMax' || valueKey === 'dateMin')
                  return { ...acc, [valueKey]: new Date(value) };
              }
              return { ...acc, [valueKey]: value };
            },
            {},
          );
          setFormValue(formattedFormValue);
        }
      }, [initialValue]);

      // if (isNil(formValue)) return null;
      return (
        <Form
          onSubmit={onSubmit}
          validate={traceValidation}
          decorators={[focusOnError]}
          key={subscription as any}
          initialValues={formValue}
          render={(props) => {
            const { handleSubmit, form } = props;
            formRef.current = form;
            return (
              <form ref={ref} onSubmit={handleSubmit}>
                <Content>
                  {fields.map((Field, index) => (
                    <FieldContainer key={index}>
                      <Field />
                    </FieldContainer>
                  ))}
                </Content>

                <ActionContainer>
                  {isNil(externalSubmit) ? null : (
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      id="submit-button"
                    >
                      {traceStatus === 'adding' ? 'Добавить' : null}
                      {traceStatus === 'editing' ? 'Изменить' : null}
                    </Button>
                  )}
                  <Button
                    onClick={onReset(form)}
                    size="small"
                    variant="outlined"
                  >
                    Отмена
                  </Button>
                </ActionContainer>
              </form>
            );
          }}
        />
      );
    },
  );

DatasetSpecificationForm.displayName = 'DatasetSpecificationForm';

type FormDataType = Record<string, any>;

export interface FormState {
  id: number;
  data?: FormDataType;
}
