import { Skeleton } from '@mui/material';
import { CohortService } from '@shared/api/services/CohortService';
import React, { useState, useEffect, useMemo } from 'react';
import { PlotlyRepresentationChart } from '@features/plotly-representation-chart/ui';
import { Container } from './ui.styled';
import { isNil } from 'lodash';
import type { PlotData } from 'plotly.js';
import type { RegionAgeProfileDeviationChartResultProps } from './types';
import {
  DEFAULT_COLOR,
  DEFAULT_LINE_WIDTH,
  DEFAULT_SIZE,
  DEFAULT_TEXT_COLOR,
  SELECTED_COLOR,
  SELECTED_LINE_COLOR,
  SELECTED_LINE_WIDTH,
  SELECTED_SIZE
} from './constants';

export const RegionAgeProfileDeviationChartResult: React.FunctionComponent<
  RegionAgeProfileDeviationChartResultProps
> = ({ processorConfig, selectedCities, preloadedPlot, onClickHandler, onSavePlot }) => {
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

  const processPlotData = (plot: PlotData, selectedCities: number[]) => {
    if (!isNil(plot)) {
      return plot.map((trace) => {
        if (!isNil(trace) && !isNil(trace.representation_data.data[0].customdata)) {
          const customdata: Array<[string, string, number]> = trace.representation_data.data[0].customdata;

          const colors: string[] = [];
          const sizes: number[] = [];
          const lineColors: string[] = [];
          const lineWidths: number[] = [];
          const textColors: string[] = [];

          customdata.forEach((cityData) => {
            const cityId = cityData[1]; // второе значение в customdata для каждого trace содержит id города
            const isSelected = selectedCities.includes(Number(cityId));

            colors.push(isSelected ? SELECTED_COLOR : DEFAULT_COLOR);
            sizes.push(isSelected ? SELECTED_SIZE : DEFAULT_SIZE);
            lineColors.push(isSelected ? SELECTED_LINE_COLOR : DEFAULT_COLOR);
            lineWidths.push(isSelected ? SELECTED_LINE_WIDTH : DEFAULT_LINE_WIDTH);
            textColors.push(isSelected ? SELECTED_COLOR : DEFAULT_TEXT_COLOR);
          });

          trace.representation_data.data[0].marker.color = colors;
          trace.representation_data.data[0].marker.size = sizes;
          trace.representation_data.data[0].marker.line = {
            color: lineColors,
            width: lineWidths
          };
          trace.representation_data.data[0].textfont = {
            color: textColors
          };
        }
        return trace;
      });
    }
    return plot;
  };

  const modifiedPlotData = useMemo(() => processPlotData(plot, selectedCities), [plot, selectedCities]);

  if (plotIsLoading) {
    return (
      <Container>
        <Skeleton variant="rounded" sx={{ width: '100%', height: '100%' }} />
      </Container>
    );
  }

  return (
    <Container>
      <PlotlyRepresentationChart plotData={modifiedPlotData} onClick={onClickHandler} />
    </Container>
  );
};
