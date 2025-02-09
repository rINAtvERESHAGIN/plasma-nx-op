import React, { useCallback, useEffect, useState } from 'react';
import {
  defaultDataGeoCity,
  defaultDataDeviceMedian,
  defaultDataWeeklyMeasurement,
  defaultDataDeviceRecords
} from './constants';
import { type PlotMouseEvent } from 'plotly.js';
import {
  Container,
  FilterContainer,
  MainContainer,
  SecondRow,
  HeaderContainer,
  StyledDialog,
  ExpandButton
} from './ui.styled';
import { ChartOfProcessorResult } from '@features/chart-of-processor-result/ui';
import { NumberOfRecordsCharts } from '@features/lab-page-number-of-records/ui';
import { LabAutocomplete } from '@features/lab-autocomplete/ui';
import { ParameterAutocomplete } from '@features/parameter-autocomplete/ui';
import { RegionAutocomplete } from '@features/region-autocomplete/ui';
import { isNil } from 'lodash';
import { Card, CardHeader } from '@plasma/ui';
import InfoTooltip from '@entities/info-icon-with-tooltip/ui';
import { GeoCityInfo, DeviceMedianInfo, chartConfigs } from './block-description';
import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
import { ArrowsOutSimple } from '@shared/draft-icons/arrows-out-simple/ArrowsOutSimple';
import { DeviceMedianProcessorResult } from '@features/device-median-chart/processor-result';
import { type PlotData } from 'plotly.js';

const LabPage: React.FunctionComponent = () => {
  const [selectedLab, setSelectedLab] = useState<number | null>(null);
  const [selectedParameter, setSelectedParameter] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<number[]>([]);
  const [dataDeviceMedian, setDataDeviceMedian] = useState<ProcessorConfiguration>(defaultDataDeviceMedian);
  const [dataGeoCity, setDataGeoCity] = useState<ProcessorConfiguration>(defaultDataGeoCity);
  const [dataWeeklyMeasurement, setDataWeeklyMeasurement] =
    useState<ProcessorConfiguration>(defaultDataWeeklyMeasurement);
  const [dataDeviceRecords, setDataDeviceRecords] = useState<ProcessorConfiguration>(defaultDataDeviceRecords);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(['Все устройства']);
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

  // Функция для выбора устройств
  const toggleDeviceSelection = (device: string): void => {
    setSelectedDevices((prevSelected) => {
      if (prevSelected.includes(device)) {
        return prevSelected.filter((d) => d !== device);
      } else {
        return [...prevSelected, device];
      }
    });
  };

  const clearSelectedDevices = useCallback(() => {
    setSelectedDevices(['Все устройства']);
  }, []);

  // Клик на регион в Plotly Map
  const handleGeoCityClick = useCallback((event: Readonly<PlotMouseEvent>) => {
    const pointData = event.points[0];
    const { customdata } = pointData;

    if (Array.isArray(customdata) && customdata.length > 1) {
      const regionId = customdata[1];

      setSelectedRegion((prevSelectedRegions) => {
        if (prevSelectedRegions.includes(regionId)) {
          return prevSelectedRegions.filter((id) => id !== regionId);
        } else {
          return [...prevSelectedRegions, regionId];
        }
      });
    }
  }, []);

  // Общая функция для обновления данных
  const updateAllDataSet = (dataSet: ProcessorConfiguration): ProcessorConfiguration => {
    return {
      ...dataSet,
      data: dataSet.data.map((item) => ({
        ...item,
        lab_ids: !isNil(selectedLab) ? selectedLab : item.lab_ids,
        parameter_ids: !isNil(selectedParameter) ? [selectedParameter] : item.parameter_ids,
        region_ids: !isNil(selectedRegion) ? selectedRegion : item.region_ids
      }))
    };
  };

  const updateDataSet = (dataSet: ProcessorConfiguration): ProcessorConfiguration => {
    return {
      ...dataSet,
      data: dataSet.data.map((item) => ({
        ...item,
        lab_ids: !isNil(selectedLab) ? selectedLab : item.lab_ids,
        parameter_ids: !isNil(selectedParameter) ? [selectedParameter] : item.parameter_ids
      }))
    };
  };

  useEffect(() => {
    if (!isNil(selectedLab) && !isNil(selectedParameter)) {
      setDataGeoCity(updateDataSet(defaultDataGeoCity));
    }
  }, [selectedLab, selectedParameter]);

  useEffect(() => {
    if (!isNil(selectedLab) && !isNil(selectedParameter) && !isNil(selectedRegion)) {
      setDataWeeklyMeasurement(updateAllDataSet(defaultDataWeeklyMeasurement));
      setDataDeviceRecords(updateAllDataSet(defaultDataDeviceRecords));
      setDataDeviceMedian(updateAllDataSet(defaultDataDeviceMedian));
    }
  }, [selectedLab, selectedParameter, selectedRegion]);

  return (
    <MainContainer>
      <FilterContainer>
        <LabAutocomplete onLabChange={setSelectedLab} />
        <ParameterAutocomplete onParameterChange={setSelectedParameter} />
        <RegionAutocomplete value={selectedRegion} onRegionChange={setSelectedRegion} />
      </FilterContainer>
      <Container>
        <NumberOfRecordsCharts
          dataWeeklyMeasurement={dataWeeklyMeasurement}
          dataDeviceRecords={dataDeviceRecords}
          onDeviceSelect={toggleDeviceSelection}
        />
        <SecondRow>
          <div>
            <Card size="small">
              <CardHeader
                headerLeft={
                  <HeaderContainer>
                    {GeoCityInfo.header}
                    <InfoTooltip title={GeoCityInfo.description} />
                  </HeaderContainer>
                }
                headerRight={
                  <ExpandButton onClick={createHandleOpenDialog('geoCity')}>
                    <ArrowsOutSimple />
                  </ExpandButton>
                }
                size="small"
              />
              <ChartOfProcessorResult
                processorConfig={dataGeoCity}
                onClickHandler={handleGeoCityClick}
                preloadedPlot={loadedCharts.geoCity}
                onSavePlot={createHandleSaveChart('geoCity')}
              />
            </Card>
          </div>
          <div>
            <Card size="small">
              <CardHeader
                headerLeft={
                  <HeaderContainer>
                    {DeviceMedianInfo.header}
                    <InfoTooltip title={DeviceMedianInfo.description} />
                  </HeaderContainer>
                }
                headerRight={
                  <ExpandButton onClick={createHandleOpenDialog('deviceMedian')}>
                    <ArrowsOutSimple />
                  </ExpandButton>
                }
                size="small"
              />
              <DeviceMedianProcessorResult
                processorConfig={dataDeviceMedian}
                preloadedPlot={loadedCharts.deviceMedian}
                onSavePlot={createHandleSaveChart('deviceMedian')}
                selectedDevices={selectedDevices}
                onActiveMenuIndexChange={clearSelectedDevices}
                setSelectedDevices={setSelectedDevices}
              />
            </Card>
          </div>
        </SecondRow>
      </Container>
      <StyledDialog open={dialogOpen} onClose={handleCloseDialog} maxWidth={false}>
        <HeaderContainer>
          {chartConfigs[selectedChart]?.header}
          <InfoTooltip title={chartConfigs[selectedChart]?.description} />
        </HeaderContainer>
        <ChartOfProcessorResult processorConfig={null} preloadedPlot={loadedCharts[selectedChart]} />
      </StyledDialog>
    </MainContainer>
  );
};

export default LabPage;
