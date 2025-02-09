import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { type PlotMouseEvent } from 'plotly.js';
import {
  ButtonColumn,
  Container,
  WeeklyMeasurementContainer,
  YearButton,
  HeaderContainer,
  StyledDialog,
  ExpandButton
} from './ui.styled';
import { ChartOfProcessorResult } from '@features/chart-of-processor-result/ui';
import { type NumberOfRecordsChartsProps } from './types';
import { years } from './constants';
import { Card, CardHeader } from '@plasma/ui';
import InfoTooltip from '@entities/info-icon-with-tooltip/ui';
import { WeeklyMeasurementInfo, DeviceRecordsInfo, chartConfigs } from './block-description';
import { isNil } from 'lodash';
import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
import { ArrowsOutSimple } from '@shared/draft-icons/arrows-out-simple/ArrowsOutSimple';
import { type PlotData } from 'plotly.js';

export const NumberOfRecordsCharts: React.FunctionComponent<NumberOfRecordsChartsProps> = ({
  dataWeeklyMeasurement,
  dataDeviceRecords,
  onDeviceSelect
}) => {
  const [dateRange, setDateRange] = useState<{
    min: string | undefined;
    max: string | undefined;
  }>({
    min: undefined,
    max: undefined
  });

  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [activeEntirePeriod, setActiveYEntirePeriod] = useState<boolean>(true);
  const [deviceRecordsData, setDeviceRecordsData] = useState<ProcessorConfiguration | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [loadedCharts, setLoadedCharts] = useState<Record<string, PlotData>>({});

  const handleSaveChart = (key: string, plot: PlotData): void => {
    if (!isNil(key) && !isNil(plot)) setLoadedCharts((prev) => ({ ...prev, [key]: plot }));
  };

  const handleOpenDialog = (chartKey: string): void => {
    setSelectedChart(chartKey);
    setDialogOpen(true);
  };

  const createHandleOpenDialog = (chartKey: string) => () => {
    handleOpenDialog(chartKey);
  };

  const createHandleSaveChart = (chartKey: string) => (plot: PlotData) => {
    handleSaveChart(chartKey, plot);
  };

  const handleCloseDialog = (): void => {
    setDialogOpen(false);
    setSelectedChart(null);
  };

  // Синхронизация dateRange с пропсами dataWeeklyMeasurement
  useEffect(() => {
    setDateRange({
      min: dataWeeklyMeasurement.data[0].date_min,
      max: dataWeeklyMeasurement.data[0].date_max
    });
  }, [dataWeeklyMeasurement]);

  // Обновление состояния deviceRecordsData при изменении пропсов
  useEffect(() => {
    setDeviceRecordsData(dataDeviceRecords);
  }, [dataDeviceRecords]);

  const handleWeeklyMeasurementClick = useCallback(
    (event: Readonly<PlotMouseEvent>) => {
      const pointData = event.points[0];
      const { customdata } = pointData;
      const date = customdata[2] as string;

      if (!isNil(date) && !isNil(deviceRecordsData)) {
        const newDeviceRecordsData = {
          ...deviceRecordsData,
          data: deviceRecordsData.data.map((item) => ({
            ...item,
            date_min: date,
            date_max: date
          }))
        };

        setDeviceRecordsData(newDeviceRecordsData);
      }
    },
    [deviceRecordsData]
  );

  const handleDeviceRecordsClick = (event: Readonly<PlotMouseEvent>) => {
    const pointData = event.points[0];
    const { x: selectedDevice } = pointData;
    onDeviceSelect(selectedDevice);
  };

  const updateDatesInData = useCallback((data: any, newDateMin: string | undefined, newDateMax: string | undefined) => {
    return {
      ...data,
      data: data.data.map((item: any) => ({
        ...item,
        date_min: newDateMin ?? item.date_min,
        date_max: newDateMax ?? item.date_max
      }))
    };
  }, []);

  const handleYearClick = (year: number) => () => {
    const newDateMin = `${year}-01-01`;
    const newDateMax = `${year}-12-31`;
    setDateRange({ min: newDateMin, max: newDateMax });
    setActiveYEntirePeriod(false);
    setActiveYear(year);
  };

  const resetDates = useCallback(() => {
    const defaultDateMin = dataWeeklyMeasurement.data[0].date_min;
    const defaultDateMax = dataWeeklyMeasurement.data[0].date_max;
    setDateRange({ min: defaultDateMin, max: defaultDateMax });
    setActiveYear(null);
    setActiveYEntirePeriod(true);
  }, [dataWeeklyMeasurement]);

  const memoizedInitialData = useMemo(
    () => updateDatesInData(dataWeeklyMeasurement, dateRange.min, dateRange.max),
    [dataWeeklyMeasurement, dateRange.min, dateRange.max, updateDatesInData]
  );

  return (
    <Container>
      <div>
        <Card size="small">
          <CardHeader
            headerLeft={
              <WeeklyMeasurementContainer>
                <HeaderContainer>
                  {WeeklyMeasurementInfo.header}
                  <InfoTooltip title={WeeklyMeasurementInfo.description} />
                </HeaderContainer>
                <ButtonColumn>
                  <YearButton isActive={activeEntirePeriod} onClick={resetDates}>
                    Весь период
                  </YearButton>
                  {years.map((year: number) => (
                    <YearButton key={year} isActive={activeYear === year} onClick={handleYearClick(year)}>
                      {year}
                    </YearButton>
                  ))}
                </ButtonColumn>
              </WeeklyMeasurementContainer>
            }
            headerRight={
              <ExpandButton onClick={createHandleOpenDialog('weeklyMeasurement')}>
                <ArrowsOutSimple />
              </ExpandButton>
            }
            size="small"
          />
          <ChartOfProcessorResult
            processorConfig={memoizedInitialData}
            onClickHandler={handleWeeklyMeasurementClick}
            preloadedPlot={loadedCharts.weeklyMeasurement}
            onSavePlot={createHandleSaveChart('weeklyMeasurement')}
          />
        </Card>
      </div>
      <div>
        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {DeviceRecordsInfo.header}
                <InfoTooltip title={DeviceRecordsInfo.description} />
              </HeaderContainer>
            }
            headerRight={
              <ExpandButton onClick={createHandleOpenDialog('deviceRecords')}>
                <ArrowsOutSimple />
              </ExpandButton>
            }
            size="small"
          />
          {!isNil(deviceRecordsData) && (
            <ChartOfProcessorResult
              processorConfig={deviceRecordsData}
              onClickHandler={handleDeviceRecordsClick}
              preloadedPlot={loadedCharts.deviceRecords}
              onSavePlot={createHandleSaveChart('deviceRecords')}
            />
          )}
        </Card>
      </div>
      <StyledDialog open={dialogOpen} onClose={handleCloseDialog} maxWidth={false}>
        <HeaderContainer>
          {chartConfigs[selectedChart]?.header}
          <InfoTooltip title={chartConfigs[selectedChart]?.description} />
        </HeaderContainer>
        <ChartOfProcessorResult processorConfig={null} preloadedPlot={loadedCharts[selectedChart]} />
      </StyledDialog>
    </Container>
  );
};
