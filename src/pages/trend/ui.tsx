import React, { useMemo, useState } from 'react';
import { defaultDataTrend, defaultDataAgeValue, defaultDataSurface3d, defaultDataAgeSexPyramid } from './data-сonfig';
import { MainContainer, HeaderContainer, StyledDialog, ExpandButton } from './ui.styled';
import { ChartOfProcessorResult } from '../../features/chart-of-processor-result/ui';
import { isNil } from 'lodash';
import { Card, CardHeader } from '@plasma/ui';
import InfoTooltip from '../../entities/info-icon-with-tooltip/ui';
import { TrendInfo, Surface3dInfo, ThirdSectionDescriptionsInfo, chartConfigs } from './block-description';
import { TrendFilterOptions } from '../../features/trend-page-filter/ui';
import { defaultFilters, thirdSectionButtons } from './constants';
import type { TrendFilterValues } from './type';
import { SelectableButton } from '../../shared/ui/sroty-selectable-button/ui';
import { ArrowsOutSimple } from '../../shared/draft-icons/arrows-out-simple/ArrowsOutSimple';
import { type PlotData } from 'plotly.js';

export const TrendPage: React.FunctionComponent = () => {
  const [filters, setFilters] = useState<TrendFilterValues>(defaultFilters);

  const [selectedFrequency, setSelectedFrequency] = useState<'day' | 'week'>('week');
  const [activeThirdSectionData, setActiveThirdSectionData] = useState<'ageValue' | 'ageSexPyramid'>('ageSexPyramid');

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

  const handleSave = (values: TrendFilterValues): void => {
    setFilters(values);
  };

  const updateAllDataSet = (dataSet) => ({
    ...dataSet,
    data: dataSet.data.map((item) => ({
      ...item,
      lab_ids: !isNil(filters.lab) ? filters.lab : item.lab_ids,
      parameter_ids: !isNil(filters.parameter) ? [filters.parameter] : item.parameter_ids,
      region_ids: filters.region.length > 0 ? filters.region : item.region_ids,
      sex: Number(filters.gender),
      age_min: filters.ageRange[0],
      age_max: filters.ageRange[1]
    }))
  });

  const dataTrend = useMemo(() => updateAllDataSet(defaultDataTrend), [filters]);
  const dataSurface3d = useMemo(() => updateAllDataSet(defaultDataSurface3d), [filters]);
  const thirdSectionData = useMemo(
    () => ({
      ageValue: updateAllDataSet(defaultDataAgeValue),
      ageSexPyramid: updateAllDataSet(defaultDataAgeSexPyramid)
    }),
    [filters]
  );

  const handleDayClick = (): void => {
    setSelectedFrequency('day');
  };

  const handleWeekClick = (): void => {
    setSelectedFrequency('week');
  };

  const handleThirdSectionButtonClick = (value: 'ageValue' | 'ageSexPyramid'): void => {
    setActiveThirdSectionData(value);
  };

  return (
    <MainContainer>
      <div>
        <div>
          <TrendFilterOptions filterValues={filters} onSave={handleSave} />
        </div>
        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {TrendInfo.header}
                <InfoTooltip title={TrendInfo.description} />
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
            processorConfig={dataTrend}
            preloadedPlot={loadedCharts.trend}
            onSavePlot={createHandleSaveChart('trend')}
          />
        </Card>
      </div>
      <div>
        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {Surface3dInfo.header}
                <InfoTooltip title={Surface3dInfo.description} />
              </HeaderContainer>
            }
            headerRight={
              <ExpandButton onClick={createHandleOpenDialog('surface3d')}>
                <ArrowsOutSimple />
              </ExpandButton>
            }
            size="small"
          />
          <ChartOfProcessorResult
            processorConfig={dataSurface3d}
            preloadedPlot={loadedCharts.surface3d}
            onSavePlot={createHandleSaveChart('surface3d')}
          />
        </Card>
        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {thirdSectionButtons.map((btn) => (
                  <SelectableButton
                    key={btn.value}
                    label={btn.label}
                    isActive={activeThirdSectionData === btn.value}
                    onClick={() => {
                      handleThirdSectionButtonClick(btn.value);
                    }}
                  />
                ))}
                <InfoTooltip title={ThirdSectionDescriptionsInfo[activeThirdSectionData].description} />
              </HeaderContainer>
            }
            headerRight={
              <ExpandButton onClick={createHandleOpenDialog(activeThirdSectionData)}>
                <ArrowsOutSimple />
              </ExpandButton>
            }
            size="small"
          />
          <ChartOfProcessorResult
            processorConfig={thirdSectionData[activeThirdSectionData]}
            preloadedPlot={loadedCharts.activeThirdSectionData}
            onSavePlot={createHandleSaveChart(activeThirdSectionData)}
          />
        </Card>
      </div>
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
