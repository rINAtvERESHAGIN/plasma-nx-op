import React, { useState } from 'react';
import { Container, HeaderButton, ButtonRow, HeaderContainer, StyledDialog, ExpandButton } from './ui.styled';
import { ChartOfProcessorResult } from '@features/chart-of-processor-result/ui';
import { defaultDataStatTest, defaultDataSTL } from './constants';
import { Card, CardHeader } from '@plasma/ui';
import InfoTooltip from '@entities/info-icon-with-tooltip/ui';
import { StatTestInfo, TableInfo, STLInfo, chartConfigs } from './block-description';
import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
import { isNil } from 'lodash';
import { AnomalyTable } from '@features/table-anomalies/ui';
import {
  type ActiveStatTestButton,
  type GraphMixerFunction,
  type UpdateDataSetHelper,
  type UpdateDataSet
} from './type';
import { ArrowsOutSimple } from '@shared/draft-icons/arrows-out-simple/ArrowsOutSimple';
import { type PlotData } from 'plotly.js';

const AnomalyPage: React.FunctionComponent = () => {
  const [dataStatTest, setDataStatTest] = useState<ProcessorConfiguration>(defaultDataStatTest);
  const [dataSTL, setDataSTL] = useState<ProcessorConfiguration>(defaultDataSTL);

  const [activeStatTestButton, setActiveStatTestButton] = useState<ActiveStatTestButton>('bothYears');

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

  const updateGraphMixerFunction = (graphMixerFunction: GraphMixerFunction): void => {
    setDataStatTest((prevData) => ({
      ...prevData,
      processorSpecification: {
        ...prevData.processorSpecification,
        MixerMethodName: graphMixerFunction
      }
    }));
  };

  const updateDataSetHelper: UpdateDataSetHelper = (defaultData, paramId, regionId, labId) => {
    return {
      ...defaultData,
      data: defaultData.data.map((item) => ({
        ...item,
        parameter_ids: !isNil(paramId) ? [paramId] : item.parameter_ids,
        region_ids: !isNil(regionId) ? [regionId] : item.region_ids,
        lab_ids: !isNil(labId) ? labId : item.lab_ids
      }))
    };
  };

  const updateDataSet: UpdateDataSet = (paramId, regionId, labId) => {
    setDataStatTest((prevData) => updateDataSetHelper(prevData, paramId, regionId, labId));
    setDataSTL((prevData) => updateDataSetHelper(prevData, paramId, regionId, labId));
  };

  const handleCurrentYearClick = (): void => {
    updateGraphMixerFunction('violin_plot_cur_year');
    setActiveStatTestButton('currentYear');
  };

  const handleBothYearsClick = (): void => {
    updateGraphMixerFunction('violin_plot_comparison');
    setActiveStatTestButton('bothYears');
  };

  return (
    <Container>
      <div>
        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {StatTestInfo.header}
                <InfoTooltip title={StatTestInfo.description} />
              </HeaderContainer>
            }
            headerRight={
              <ButtonRow>
                <HeaderButton isActive={activeStatTestButton === 'currentYear'} onClick={handleCurrentYearClick}>
                  За текущий год
                </HeaderButton>
                <HeaderButton isActive={activeStatTestButton === 'bothYears'} onClick={handleBothYearsClick}>
                  За прошлый и текущий годы
                </HeaderButton>
                <ExpandButton onClick={createHandleOpenDialog('statTest')}>
                  <ArrowsOutSimple />
                </ExpandButton>
              </ButtonRow>
            }
            size="small"
          />
          <ChartOfProcessorResult
            processorConfig={dataStatTest}
            preloadedPlot={loadedCharts.statTest}
            onSavePlot={createHandleSaveChart('statTest')}
          />
        </Card>

        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {STLInfo.header}
                <InfoTooltip title={STLInfo.description} />
              </HeaderContainer>
            }
            headerRight={
              <ExpandButton onClick={createHandleOpenDialog('stl')}>
                <ArrowsOutSimple />
              </ExpandButton>
            }
            size="small"
          />
          <ChartOfProcessorResult
            processorConfig={dataSTL}
            preloadedPlot={loadedCharts.stl}
            onSavePlot={createHandleSaveChart('stl')}
          />
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {TableInfo.header}
                <InfoTooltip title={TableInfo.description} />
              </HeaderContainer>
            }
          />
          <AnomalyTable onRowClick={updateDataSet} />
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

export default AnomalyPage;
