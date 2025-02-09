import React, { useMemo, useState } from 'react';
import { MainContainer, HeaderContainer, StyledDialog, ExpandButton } from './ui.styled';
import { ChartOfProcessorResult } from '@features/chart-of-processor-result/ui';
import { isNil } from 'lodash';
import { Card, CardHeader } from '@plasma/ui';
import InfoTooltip from '@entities/info-icon-with-tooltip/ui';
import { TrendInfo, AgeValueInlineInfo, chartConfigs } from './block-description';
import { additionalDefaultFilter, defaultFilters } from './constants';
import { CohortSelectedFilterCards } from '@entities/cohort-selected-filter-cards/ui';
import type { ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
import { useLabsCore, useParametersCore, useRegionsCore } from '@app/core-data-slice/reducer';
import { CohortFilterOptions } from '@features/cohort-comparison-page-filter/ui';
import { ArrowsOutSimple } from '@shared/draft-icons/arrows-out-simple/ArrowsOutSimple';
import { defaultDataAgeValueInline, defaultDataSTLProcessor } from './data-config';
import type { TranslatedFilterValues, TrendFilterValues } from './type';
import { type PlotData } from 'plotly.js';

const CohortComparisonPage: React.FunctionComponent = () => {
  const labs = useLabsCore().data;
  const parameters = useParametersCore().data;
  const regions = useRegionsCore().data;
  const [filters, setFilters] = useState<TrendFilterValues>(defaultFilters);
  const [filterSelections, setFilterSelections] = useState<TrendFilterValues[]>([
    defaultFilters,
    additionalDefaultFilter
  ]);
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
    setFilterSelections((prevSelections) => [...prevSelections, values]);
  };

  const handleDelete = (index: number): void => {
    setFilterSelections((prevSelections) => prevSelections.filter((_, i) => i !== index));
  };

  const translateFilters = (selections: TrendFilterValues[]): TranslatedFilterValues[] => {
    return selections.map((selection) => ({
      lab: !isNil(labs)
        ? selection.lab.map((id) => labs.find((lab) => lab.id === id)?.name_ru ?? id).join(', ')
        : selection.lab.join(', '),

      parameter: !isNil(parameters)
        ? (parameters.find((param) => param.id === selection.parameter)?.name_ru ?? selection.parameter)
        : selection.parameter,

      region: !isNil(regions)
        ? selection.region
            .map((regionId) => Object.values(regions).find((region) => region.id === regionId)?.name_ru ?? regionId)
            .join(', ')
        : selection.region.join(', '),

      gender: selection.gender,
      minAge: selection.ageRange[0],
      maxAge: selection.ageRange[1]
    }));
  };

  const updateAllDataSet = (dataSet: ProcessorConfiguration): ProcessorConfiguration => ({
    ...dataSet,
    data: filterSelections.map((filter) => ({
      ...dataSet.data[0],
      lab_ids: filter.lab,
      parameter_ids: [filter.parameter],
      region_ids: filter.region,
      sex: Number(filter.gender),
      age_min: filter.ageRange[0],
      age_max: filter.ageRange[1]
    }))
  });

  const dataTrend = useMemo(() => updateAllDataSet(defaultDataSTLProcessor), [filterSelections]);
  const dataAgeValueInline = useMemo(() => updateAllDataSet(defaultDataAgeValueInline), [filterSelections]);

  return (
    <MainContainer>
      <CohortFilterOptions filterValues={filters} onSave={handleSave} filterSelections={filterSelections} />
      <CohortSelectedFilterCards filterSelections={translateFilters(filterSelections)} onDelete={handleDelete} />

      <div>
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

export default CohortComparisonPage;
