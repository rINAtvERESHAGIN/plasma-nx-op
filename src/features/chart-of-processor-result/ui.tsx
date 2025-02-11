import { Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Container } from './ui.styled';
import { isNil } from 'lodash';
import type { PlotData } from 'plotly.js';
import type { ChartOfProcessorResultProps } from './types';
import { CohortService } from '../../shared';
import { PlotlyRepresentationChart } from '../plotly-representation-chart/ui';

export const ChartOfProcessorResult: React.FunctionComponent<ChartOfProcessorResultProps> = ({
  processorConfig,
  preloadedPlot,
  onClickHandler,
  onSavePlot
}) => {
  const [plot, setPlot] = useState<PlotData | undefined>(preloadedPlot);
  const [plotIsLoading, setPlotIsLoading] = React.useState(false);

  useEffect(() => {
    const handleUploadTraces = async (): Promise<void> => {
      if (!isNil(processorConfig)) {
        try {
          setPlotIsLoading(true);
          const requestData = {
            data: processorConfig.data,
            processorSpecification: processorConfig.processorSpecification
          };
          const plot = await CohortService.requestSendCohort(
            requestData,
            '/api/get_chart_of_processor_result_for_dataset/'
          );

          setPlot(plot);
          if (!isNil(onSavePlot)) {
            onSavePlot(plot);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setPlotIsLoading(false);
        }
      }
    };

    handleUploadTraces().catch((e) => {
      console.error(e);
    });
  }, [processorConfig]);

  if (plotIsLoading) {
    return (
      <Container>
        <Skeleton variant="rounded" sx={{ width: '100%', height: '100%' }} />
      </Container>
    );
  }

  return (
    <Container>
      <PlotlyRepresentationChart plotData={plot} onClick={onClickHandler} />
    </Container>
  );
};
