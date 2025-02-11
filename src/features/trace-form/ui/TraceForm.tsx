import React, { useCallback, useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Form } from 'react-final-form';
import { type FormApi } from 'final-form';
import { Button } from '@mui/material';
import { useAppSelector } from '@org/store-redux';
import { type DatasetSpecificationStatus } from 'types';
import { type IPropsDatasetSpecification } from '../@types/IProps';
import { AdditionCardActionStyled as CardActions, AdditionCardContent as CardContent, Content } from './ui.styled';
import { traceValidation } from '../lib/validation';
import ParameterDatasetSpecification from './trace-field/parameter';
import LabDatasetSpecification from './trace-field/lab';
import RegionDatasetSpecification from './trace-field/region';
import AgeDatasetSpecification from './trace-field/age';
import HumanSexDatasetSpecification from './trace-field/human-sex';
import DateDatasetSpecification from './trace-field/date';
import PermissionDatasetSpecification from './trace-field/permission';
import FinalFormStateToRedux from '../../../shared/api/lib/final-form/final-form-state-to-redux';
import DatasetSpecificationFormHeader from './trace-form-header';
import SubmitButton from './submit-button/ui';
import { DatasetSpecificationSubmitButtonStyled } from './submit-button/ui.styled';

export function DatasetSpecificationForm({
  externalSubmit,
  initialValue,
  traceStatus,
  externalSubmitEditing
}: IPropsDatasetSpecification): React.ReactNode {
  const labs = useAppSelector((state) => state.labs.data);
  const regions = useAppSelector((state) => state.regions.data);
  const parameters = useAppSelector((state) => state.parameters.data);

  const subscription = { submitting: true };

  const [anim] = useState(false);

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

  const defaultInitialValue = useMemo(
    () => ({
      ageRange: [20, 50],
      date: new Date('2015-01-01'),
      humanSex: '0',
      parameter: 0,
      permission: 'week',
      selectedLab:
        labs != null ? labs.filter((lab) => lab.name_ru === 'Инвитро').reduce((acc, found) => found.id, 0) : 0,
      selectedParameter:
        parameters != null
          ? parameters
              .filter((parameter) => parameter.name_en === 'c_reactive_protein')
              .reduce((acc, found) => found.id, 0)
              .toString()
          : '0',
      selectedRegion: regions != null ? [regions['RU-MOW']] : undefined
    }),
    []
  );

  const getTitle = useCallback(
    (status: DatasetSpecificationStatus): string => {
      if (status === 'adding') {
        return 'Новый DatasetSpecification';
      }
      if (status === 'editing') {
        return `Изменения DatasetSpecification № ${initialValue.traceIndex as string}`;
      }
      return '';
    },
    [initialValue]
  );

  return (
    <Card
      sx={{
        width: '100%',
        overflow: 'auto',
        height: '100%',
        boxShadow: 'none'
      }}
      arial-label="trace-form-card-root"
    >
      <Form
        onSubmit={onSubmit}
        validate={traceValidation}
        initialValues={initialValue?.trace ?? defaultInitialValue}
        key={subscription as any}
        render={(props) => {
          const { handleSubmit, form } = props;

          return (
            <form onSubmit={handleSubmit} id="trace-form">
              <FinalFormStateToRedux form="trace" />
              <CardContent>
                <DatasetSpecificationFormHeader title={getTitle(traceStatus)} />
                <Content>
                  <>
                    {/* Параметер */}
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Выберите параметр
                    </Typography>
                    <ParameterDatasetSpecification />
                  </>
                  <>
                    {/* Лаборатория */}
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Выберите лабораторию
                    </Typography>
                    <LabDatasetSpecification />
                  </>

                  <>
                    {/* Выберите регион */}
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Выберите регион
                    </Typography>
                    <RegionDatasetSpecification />
                  </>
                  <>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Укажите пол
                    </Typography>
                    <HumanSexDatasetSpecification />
                  </>
                  <>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Укажите возвраст
                    </Typography>
                    <AgeDatasetSpecification />
                  </>

                  <>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Укажите дату
                    </Typography>
                    <DateDatasetSpecification />
                  </>

                  <>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Укажите разрешение
                    </Typography>
                    <PermissionDatasetSpecification />
                  </>
                </Content>
              </CardContent>
              <CardActions>
                <SubmitButton>
                  <DatasetSpecificationSubmitButtonStyled
                    type="submit"
                    size="small"
                    variant="contained"
                    id="submit-button-trace-form"
                  >
                    {traceStatus === 'adding' ? 'Добавить' : null}
                    {traceStatus === 'editing' ? 'Изменить' : null}
                  </DatasetSpecificationSubmitButtonStyled>
                </SubmitButton>
                <Button onClick={onReset(form)} size="small" variant={anim ? 'contained' : 'outlined'}>
                  Отмена
                </Button>
              </CardActions>
            </form>
          );
        }}
      />
    </Card>
  );
}
