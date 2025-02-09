import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import DatasetSpecificationChart from '@entities/dataset-specification-chart/ui';
import { CenteredElement } from '@pages/traces/ui/ui.styled';
import { request as __request } from '@shared/api/core/request';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { Skeleton } from '@mui/material';
import { useActiveRegion } from '@shared/model/useActiveRegion';
import { useRegionsCore } from '@app/core-data-slice/reducer';
import { withConnectPlot } from '@shared/ui/plotly-interaction/with-diagram';
import { ChartIds } from '@entities/dataset-specification-chart/constants';
import { type ChartId } from '@shared/api/model/ChartId';

const PlotlyInteraction = withConnectPlot(DatasetSpecificationChart);

const SkeletonStatsBirthsDeathsPlotly = (): React.ReactNode => {
  return (
    <>
      <Skeleton variant="rectangular" width="95%" height="20px" />
      <div style={{ height: '10px' }} />
      <Skeleton variant="rectangular" width="95%" height="450px" />
    </>
  );
};

const StatsCoronaPlotly = (): React.ReactNode => {
  const chartId: ChartId = ChartIds.STATS_CORONA_PLOTLY;
  const region = useActiveRegion();
  const regions = useRegionsCore();
  const [chartData, setChartData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChart = async (): Promise<void> => {
      try {
        const response = await __request(OpenAPI, {
          method: 'POST',
          url: '/api/corona/',
          body: { iso_code: regions.data[region.data.iso_code].iso_code }
        });

        setChartData(response);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    if (region.data !== '') {
      setLoading(true);
      setTimeout(() => {
        getChart();
      }, 10);
    } else {
      setChartData(undefined);
      setLoading(false);
    }
  }, [region.data]);

  return (
    <Box sx={{ padding: '15px' }}>
      <CenteredElement>
        {loading ? (
          <SkeletonStatsBirthsDeathsPlotly />
        ) : chartData !== undefined ? (
          <PlotlyInteraction chartId={chartId} plotData={chartData} fullParentHeight={false} />
        ) : (
          <></>
        )}
      </CenteredElement>
    </Box>
  );
};
export default StatsCoronaPlotly;
