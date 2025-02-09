import React, { useState } from 'react';
import { Container, HeaderContainer, StyledDialog, ExpandButton } from './ui.styled';
import { defaultDataIndexes } from './constants';
import { ChartOfProcessorResult } from '@features/chart-of-processor-result/ui';
import { IndexesInfo, ProInflammatoryIndicatorsTableInfo, chartConfigs } from './block-description';
import { Card, CardHeader } from '@plasma/ui';
import InfoTooltip from '@entities/info-icon-with-tooltip/ui';
import { EpidemiologistMap } from '@features/epidemiologist-map/ui';
import { ProInflammatoryIndicatorsTable } from '@features/epidemiologist-table/ui';
import { type RegionId, type UpdateDataSetHelper } from './type';
import { isNil } from 'lodash';
import { ArrowsOutSimple } from '@shared/draft-icons/arrows-out-simple/ArrowsOutSimple';
import { type PlotData } from 'plotly.js';

const EpidemiologistPage: React.FunctionComponent = () => {
  const [dataIndexes, setDataIndexes] = useState(defaultDataIndexes);

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

  const updateDataSetHelper: UpdateDataSetHelper = (defaultData, regionId) => {
    return {
      ...defaultData,
      data: defaultData.data.map((item) => ({
        ...item,
        region_ids: regionId !== null ? [regionId] : item.region_ids
      }))
    };
  };

  const updateDataSet = (regionId: RegionId): void => {
    setDataIndexes((prevData) => updateDataSetHelper(prevData, regionId));
  };

  return (
    <Container>
      <div>
        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                Средние понедельные значения индекса SIRI и СРБ
                <InfoTooltip title={IndexesInfo.description} />
              </HeaderContainer>
            }
            headerRight={
              <ExpandButton onClick={createHandleOpenDialog('indexes')}>
                <ArrowsOutSimple />
              </ExpandButton>
            }
            size="small"
          />
          <ChartOfProcessorResult
            processorConfig={dataIndexes}
            preloadedPlot={loadedCharts.indexes}
            onSavePlot={createHandleSaveChart('indexes')}
          />
        </Card>
        <>
          <EpidemiologistMap />
        </>
      </div>
      <div>
        <Card>
          <CardHeader
            headerLeft={
              <HeaderContainer>
                Провоспалительные показатели
                <InfoTooltip title={ProInflammatoryIndicatorsTableInfo.description} />
              </HeaderContainer>
            }
          />
          <ProInflammatoryIndicatorsTable onRowClick={updateDataSet} />
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
export default EpidemiologistPage;
