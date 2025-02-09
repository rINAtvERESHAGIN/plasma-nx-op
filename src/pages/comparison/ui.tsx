import React, { useCallback, useEffect, useState } from 'react';
import { defaultDataRegionAgeProfileDeviation, defaultDataAgeValueInline, defaultDataSTLProcessor } from './constants';
import { type PlotMouseEvent } from 'plotly.js';
import { isNil } from 'lodash';
import {
  MainContainer,
  HeaderContainer,
  FilterContainer,
  ChartsContainer,
  RightChartContainer,
  Hint,
  StyledDialog,
  ExpandButton
} from './ui.styled';
import { ChartOfProcessorResult } from '@features/chart-of-processor-result/ui';
import { Card, CardHeader } from '@plasma/ui';
import InfoTooltip from '@entities/info-icon-with-tooltip/ui';
import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
import { RegionAgeProfileDeviationInfo, AgeValueInlineInfo, STLProcessorInfo, chartConfigs } from './block-description';
import { LabAutocomplete } from '@features/lab-autocomplete/ui';
import { ComparisonMenuButton } from '@features/comparison-menu-button/ui';
import { RegionAgeProfileDeviationChartResult } from '@features/comparison-region-age-profile-deviation-chart-result/ui';
import { ParameterAutocomplete } from '@features/parameter-autocomplete/ui';
import { ArrowsOutSimple } from '@shared/draft-icons/arrows-out-simple/ArrowsOutSimple';
import { type PlotData } from 'plotly.js';

const RegionsComparison: React.FunctionComponent = () => {
  const [dataRegionAgeProfileDeviation, setDataRegionAgeProfileDeviation] = useState<ProcessorConfiguration>(
    defaultDataRegionAgeProfileDeviation
  );
  const [dataAgeValueInline, setDataAgeValueInline] = useState<ProcessorConfiguration>(defaultDataAgeValueInline);
  const [dataSTLProcessor, setDataSTLProcessor] = useState<ProcessorConfiguration>(defaultDataSTLProcessor);
  const [selectedLab, setSelectedLab] = useState<number | null>(null);
  const [selectedParameter, setSelectedParameter] = useState<number | null>(null);
  const [selectedCities, setSelectedСities] = useState<number[]>([508, 2074]);
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

  // Клик по точке (населенному пункту) в графике
  const handleRegionClick = useCallback((event: Readonly<PlotMouseEvent>) => {
    const pointData = event.points[0];
    const { customdata } = pointData;

    if (Array.isArray(customdata) && customdata.length > 1) {
      const cityId = customdata[1];

      if (!isNil(cityId)) {
        setSelectedСities((prevSelectedCity) => {
          if (prevSelectedCity.includes(cityId)) {
            // Если город уже выбран, удаляем его из списка
            return prevSelectedCity.filter((id) => id !== cityId);
          } else {
            // Если город не выбран, добавляем его
            return [...prevSelectedCity, cityId];
          }
        });
      }
    }
  }, []);

  // Обновление всех графиков
  const updateAllChartsDataSet = (dataSet: ProcessorConfiguration): ProcessorConfiguration => {
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
      setDataRegionAgeProfileDeviation(updateAllChartsDataSet(defaultDataRegionAgeProfileDeviation));
      setDataAgeValueInline(updateAllChartsDataSet(defaultDataAgeValueInline));
      setDataSTLProcessor(updateAllChartsDataSet(defaultDataSTLProcessor));
    }
  }, [selectedLab, selectedParameter]);

  // Обновление графиков с городами вместо регионов
  const updateСityDependentDataSet = (dataSet: ProcessorConfiguration): ProcessorConfiguration => {
    if (isNil(selectedCities) || selectedCities.length === 0) {
      return dataSet;
    }

    const updatedData = selectedCities
      .map((cityId) =>
        dataSet.data.map((item) => ({
          ...item,
          lab_ids: !isNil(selectedLab) ? selectedLab : item.lab_ids,
          parameter_ids: !isNil(selectedParameter) ? [selectedParameter] : item.parameter_ids,
          dadata_entry_ids: [cityId]
        }))
      )
      .flat();

    return {
      ...dataSet,
      data: updatedData
    };
  };

  useEffect(() => {
    if (!isNil(selectedLab) && !isNil(selectedParameter) && !isNil(selectedCities)) {
      setDataAgeValueInline(updateСityDependentDataSet(defaultDataAgeValueInline));
      setDataSTLProcessor(updateСityDependentDataSet(defaultDataSTLProcessor));
    }
  }, [selectedLab, selectedParameter, selectedCities]);

  return (
    <MainContainer>
      <ComparisonMenuButton />
      <FilterContainer>
        <LabAutocomplete onLabChange={setSelectedLab} />
        <ParameterAutocomplete onParameterChange={setSelectedParameter} />
      </FilterContainer>
      <ChartsContainer>
        <Card size="large">
          <CardHeader
            headerLeft={
              <div>
                <HeaderContainer>
                  {RegionAgeProfileDeviationInfo.header}
                  <InfoTooltip title={RegionAgeProfileDeviationInfo.description} />
                </HeaderContainer>
                <Hint>(*) выберете населенный пункт для добавления в когорту</Hint>
              </div>
            }
            headerRight={
              <ExpandButton onClick={createHandleOpenDialog('regionAgeProfileDeviation')}>
                <ArrowsOutSimple />
              </ExpandButton>
            }
            size="large"
          />
          <RegionAgeProfileDeviationChartResult
            processorConfig={dataRegionAgeProfileDeviation}
            onClickHandler={handleRegionClick}
            selectedCities={selectedCities}
            preloadedPlot={loadedCharts.regionAgeProfileDeviation}
            onSavePlot={createHandleSaveChart('regionAgeProfileDeviation')}
          />
        </Card>

        <RightChartContainer>
          <Card size="small">
            <CardHeader
              headerLeft={
                <HeaderContainer>
                  {AgeValueInlineInfo.header}
                  <InfoTooltip title={AgeValueInlineInfo.description} />
                </HeaderContainer>
              }
              headerRight={
                <ExpandButton onClick={createHandleOpenDialog('ageValueInline')}>
                  <ArrowsOutSimple />
                </ExpandButton>
              }
              size="small"
            />
            <ChartOfProcessorResult
              processorConfig={dataAgeValueInline}
              preloadedPlot={loadedCharts.ageValueInline}
              onSavePlot={createHandleSaveChart('ageValueInline')}
            />
          </Card>

          <Card size="small">
            <CardHeader
              headerLeft={
                <HeaderContainer>
                  {STLProcessorInfo.header}
                  <InfoTooltip title={STLProcessorInfo.description} />
                </HeaderContainer>
              }
              headerRight={
                <ExpandButton onClick={createHandleOpenDialog('trend')}>
                  <ArrowsOutSimple />
                </ExpandButton>
              }
              size="small"
            />
            <ChartOfProcessorResult
              processorConfig={dataSTLProcessor}
              preloadedPlot={loadedCharts.trend}
              onSavePlot={createHandleSaveChart('trend')}
            />
          </Card>
        </RightChartContainer>
      </ChartsContainer>
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
export default RegionsComparison;
