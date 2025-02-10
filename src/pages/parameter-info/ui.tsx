import React from 'react';
import { useParams } from 'react-router-dom';
import ParameterCard from '../../entities/parameter-card/ui';
import { createDatasetSpecification } from './utils';
import { CardContainer } from './ui.styled';
import { useParametersCore } from '@org/store-redux';
import { EpidemiologistContainer } from '../epidemiologist-page';

export const ParameterInfo = (): React.ReactNode => {
  const { parameterId } = useParams();
  const parameters = useParametersCore();

  const selectedParameterId = Number(parameterId);
  const selectedParameter = parameters.data?.find((p) => p.id === selectedParameterId);

  if (selectedParameter === undefined) {
    return <>Параметр не найден!</>;
  }

  const datasetSpecification = createDatasetSpecification(selectedParameterId);

  return (
    <>
      <CardContainer>
        <ParameterCard item={selectedParameter} />
      </CardContainer>
      <EpidemiologistContainer id="image-wrapper">
        {/* <ChartContainer>
          <Portal chartUrl='' initialData={datasetSpecification.STL} expandState='full' />
        </ChartContainer>
        <ChartContainer>
          <Portal chartUrl='' initialData={datasetSpecification.WeekMedianValue} expandState='full' />
        </ChartContainer>
        <ChartContainer>
          <Portal chartUrl='' initialData={datasetSpecification.AgeValue} expandState='full' />
        </ChartContainer> */}
      </EpidemiologistContainer>
    </>
  );
};

