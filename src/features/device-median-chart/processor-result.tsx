import { Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { type LegendClickEvent, type PlotData } from 'plotly.js';
import { isNil } from 'lodash';
import { Container } from './ui.styled';
import type { DeviceMedianProcessorResultProps } from './types';
import { CohortService } from '../../shared';
import { DeviceMedianPlotlyRepresentation } from './plotly-representation';

export const DeviceMedianProcessorResult: React.FunctionComponent<DeviceMedianProcessorResultProps> = ({
  processorConfig,
  preloadedPlot,
  selectedDevices,
  onClickHandler,
  onSavePlot,
  onActiveMenuIndexChange,
  setSelectedDevices
}) => {
  const [plot, setPlot] = useState(preloadedPlot);
  const [plotIsLoading, setPlotIsLoading] = React.useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const handleLegendClick = (event: LegendClickEvent): void => {
    const { data, curveNumber } = event;
    const trace = data[curveNumber] as PlotData;
    const legendgroup = trace.legendgroup;

    if (!isNil(legendgroup)) {
      // Обновляем список выбранных устройств
      setSelectedDevices((prevSelected) => {
        if (prevSelected.includes(legendgroup)) {
          return prevSelected.filter((d) => d !== legendgroup);
        } else {
          return [...prevSelected, legendgroup];
        }
      });
    }
  };

  const handleButtonClick = (activeIndex: number): void => {
    setActiveMenuIndex(activeIndex);
    onActiveMenuIndexChange?.();
  };

  useEffect(() => {
    if (!isNil(plot)) {
      const updatedPlot = { ...plot };

      // Убедимся, что в updatemenus есть свойство active
      if (
        updatedPlot[0].representation_data.layout.updatemenus &&
        updatedPlot[0].representation_data.layout.updatemenus.length > 0
      ) {
        if (typeof updatedPlot[0].representation_data.layout.updatemenus[0].active === 'undefined') {
          // Если свойства active нет, добавляем его
          updatedPlot[0].representation_data.layout.updatemenus[0].active = 0;
        }
      }

      const currentActiveMenuIndex = updatedPlot[0].representation_data.layout.updatemenus[0].active;

      // Если activeMenuIndex изменился, вызываем коллбек
      if (activeMenuIndex !== currentActiveMenuIndex) {
        setActiveMenuIndex(currentActiveMenuIndex);
        onActiveMenuIndexChange?.();
      }

      const traces = updatedPlot[0].representation_data.data;
      const updatedTraces = traces.map((trace) => {
        const isMatchingGroup = selectedDevices.includes(trace.legendgroup);

        if (!isMatchingGroup) {
          if (trace.customdata) {
            return { ...trace, visible: 'legendonly' };
          } else {
            return { ...trace, visible: false };
          }
        }

        // Логика для изменения видимости в зависимости от активной кнопки
        if (activeMenuIndex === 0) {
          // Режим "без разбросов"
          if (trace.customdata) {
            return { ...trace, visible: true };
          } else {
            return { ...trace, visible: 'legendonly' };
          }
        } else if (activeMenuIndex === 1) {
          // Режим "с разбросами"
          return { ...trace, visible: true };
        }
        return trace;
      });

      updatedPlot[0].representation_data.data = updatedTraces;
      setPlot(updatedPlot);
    }
  }, [selectedDevices, activeMenuIndex]);

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

          if (
            plot[0].representation_data.layout.updatemenus &&
            plot[0].representation_data.layout.updatemenus.length > 0
          ) {
            const initialActive = plot[0].representation_data.layout.updatemenus[0].active || 0;
            setActiveMenuIndex(initialActive);
          }
          if (onSavePlot) {
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
      <DeviceMedianPlotlyRepresentation
        plotData={plot}
        onClick={onClickHandler}
        onLegendClick={handleLegendClick}
        onButtonClicked={handleButtonClick}
      />
    </Container>
  );
};
