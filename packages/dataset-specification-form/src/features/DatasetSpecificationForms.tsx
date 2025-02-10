import { Box, Button, Chip, IconButton } from '@mui/material';
import { type FormApi } from 'final-form';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { DatasetSpecificationForm } from '../entities';
import { FormsContainer, FormContainer } from './FormsContainer';
import { datasetSpecificationFormService } from '../shared';
import { isNil } from 'lodash';
import { useLabsCore, useParametersCore, useRegionsCore } from '@org/store-redux';

interface AllFormState {
  id: number;
  ref: React.RefObject<FormApi>;
  externalSubmit: any;
  initialValue: any;
  traceStatus: string;
  externalSubmitEditing: any;
}

interface DatasetSpecificationFormsProps {
  externalSubmit: any;
  initialValue: any;
  traceStatus: any;
  externalSubmitEditing: any;
  externalSubmitAllForm: any;
}
const useDefaultDatasetSpecificationFormValue = (): object => {
  const lab = useLabsCore().data;
  const parameters = useParametersCore().data;
  const regions = useRegionsCore().data;

  return datasetSpecificationFormService.getDefaultInitialValue(parameters, lab, regions);
};
/**
 *DatasetSpecificationForms
 */
export const DatasetSpecificationForms: React.FunctionComponent<DatasetSpecificationFormsProps> = forwardRef(
  (
    { initialValue, traceStatus, externalSubmit, externalSubmitEditing, externalSubmitAllForm },
    ref
  ): React.ReactNode => {
    const defaultFormValue = useDefaultDatasetSpecificationFormValue();

    const [forms, setForms] = useState<AllFormState[]>([
      {
        id: Date.now(),
        ref: React.createRef<FormApi>(),
        externalSubmit,
        initialValue,
        traceStatus,
        externalSubmitEditing
      }
    ]);

    const handleOnClick = (event) => {
      event.preventDefault();
      setForms((prev) => [
        ...prev,
        {
          id: Date.now(),
          ref: React.createRef<FormApi>(),
          externalSubmit,
          initialValue: defaultFormValue ?? initialValue,
          traceStatus,
          externalSubmitEditing
        }
      ]);
    };

    const removeForm = (formId: number): void => {
      setForms((prevForms) => prevForms.filter((form) => form.id !== formId));
    };

    const handleSubmitAll = (): void => {
      const allValues = forms
        .map((form) => {
          const formInstance = form.ref.current;
          if (formInstance) {
            return formInstance.getState().values;
          }
          return undefined;
        }, {})
        .filter(Boolean);
      externalSubmitAllForm(allValues);
    };

    useEffect(() => {
      if (initialValue.length > 0) {
        const newForms = initialValue.map((initVal) => {
          return {
            id: Date.now(),
            ref: React.createRef<FormApi>(),
            externalSubmit,
            initialValue: initVal,
            traceStatus,
            externalSubmitEditing
          };
        });
        setForms(newForms);
      }
    }, [externalSubmit, externalSubmitEditing, initialValue, traceStatus]);

    useImperativeHandle(ref, () => ({
      continueSubmitFormHandler: () => {
        const allValues = forms
          .map((form) => {
            const formInstance = form.ref.current;
            if (formInstance) {
              return formInstance.getState().values;
            }
            return undefined;
          }, {})
          .filter(Boolean);
        return allValues;
      }
    }));

    return (
      <>
        <Box
          ref={ref}
          sx={{
            paddingBottom: '16px',
            paddingTop: '32px',
            display: 'flex',
            gap: '8px'
          }}
        >
          {isNil(externalSubmitAllForm) ? null : (
            <Button size="small" onClick={handleSubmitAll} endIcon={<SendIcon />}>
              Отправить все
            </Button>
          )}
          <Button size="small" onClick={handleOnClick} endIcon={<AddIcon />}>
            Добавить
          </Button>
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <FormsContainer>
            {forms.map((form, index) => (
              <FormContainer key={form.id}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'auto auto',
                      gap: '8px'
                    }}
                  >
                    <Chip sx={{ gridColumn: '1/1' }} label={index + 1} color="primary" variant="outlined" />
                    <IconButton
                      sx={{ justifySelf: 'flex-end' }}
                      aria-label="delete"
                      disabled={forms.length === 1}
                      color="primary"
                      onClick={() => removeForm(form.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <DatasetSpecificationForm
                    ref={form.ref}
                    externalSubmit={form.externalSubmit}
                    initialValue={form.initialValue}
                    traceStatus={form.traceStatus}
                    externalSubmitEditing={form.externalSubmitEditing}
                  />
                </Box>
              </FormContainer>
            ))}
          </FormsContainer>
        </Box>
      </>
    );
  }
);

DatasetSpecificationForms.displayName = 'DatasetSpecificationForms';
