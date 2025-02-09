import { converterFormData, convertorProcessorSpecification } from '@features/portal/portal.utils';
import { CohortService } from '@shared/api/services/CohortService';
import { isNil } from 'lodash';
import React from 'react';
import { type IProps } from './processor-stages.ui';
import { type IsProcessing, type StepPipeline } from './types';
import { Typography } from '@mui/material';

export const getOptionSign = (isProcessing: IsProcessing): React.ReactNode | null =>
  isProcessing === 'not-started' ? (
    <Typography sx={{ fontSize: '10px' }} variant="caption">
      Требуется выполнения предыдущих шагов
    </Typography>
  ) : null;

export const getThirdStepLabel = (isProcessing: IsProcessing): string =>
  isProcessing === 'not-started'
    ? 'Результаты'
    : isProcessing === 'in-progress'
    ? 'Загружаем данные'
    : 'Результаты загружены';

export const fetchNewResult = async ({ dataset, processor }) => {
  const requestData = {
    data: dataset.map((data) => converterFormData(data)),
    processorSpecification: convertorProcessorSpecification(processor[0])
  };
  return await CohortService.requestSendCohort(requestData, '/api/get_chart_of_processor_result_for_dataset/');
};

export const initializer = (
  initialData: IProps['initialData'],
  setDataset: React.Dispatch<React.SetStateAction<object[]>>,
  setProcessor: React.Dispatch<React.SetStateAction<object[]>>,
  setCondition: React.Dispatch<React.SetStateAction<'new' | 'updated' | undefined>>,
  setUuidResult: React.Dispatch<React.SetStateAction<string | undefined>>,
  setStepPipeline: React.Dispatch<React.SetStateAction<StepPipeline>>,
  setIsProcessing: React.Dispatch<React.SetStateAction<'complete' | 'in-progress' | 'not-started'>>,
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
): void => {
  if (!isNil(initialData)) {
    const { condition, resultUuid, stepPipeline, isProcessing } = initialData;
    const { dataset, processor } = initialData.datasetSpecificationFormValues;
    setCondition((prev) => (isNil(prev) ? condition : prev));
    setUuidResult((prev) => (isNil(prev) ? resultUuid : prev));
    setStepPipeline((prev) => (isNil(prev) ? { ...stepPipeline } : prev));
    setIsProcessing((prev) => (isNil(prev) ? isProcessing : prev));

    processor?.length > 0 && setProcessor((prev) => (isNil(prev) ? processor : prev));
    dataset?.length > 0 &&
      setDataset((prev) =>
        isNil(prev)
          ? [
              ...dataset.map((dataset) => {
                return {
                  ...dataset,
                  dateMin: new Date(dataset.dateMin),
                  dateMax: new Date(dataset.dateMax)
                };
              })
            ]
          : prev
      );

    stepPipeline &&
      setActiveStep(() => {
        return Object.keys(stepPipeline).reduce((acc, stepKey) => {
          return acc + (stepPipeline[stepKey] === 'complete' ? 1 : 0);
        }, 0);
      });
  }
};
