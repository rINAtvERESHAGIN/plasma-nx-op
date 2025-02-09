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

const PlotlyInteraction = withConnectPlot(DatasetSpecificationChart);

function SkeletonStatsAgeSexPyramidPlotly(): React.ReactNode {
  return (
    <>
      <Skeleton variant="rectangular" width="95%" height="20px" />
      <div style={{ height: '10px' }} />
      <Skeleton variant="rectangular" width="95%" height="450px" />
    </>
  );
}
export const StatsAgeSexPyramidPlotly = (): React.ReactNode => {
  const region = useActiveRegion();
  const regions = useRegionsCore();

  const [chartData, setChartData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChart = async (): Promise<void> => {
      try {
        const response = await __request(OpenAPI, {
          method: 'GET',
          url: `/api/region/${regions.data[region.data.iso_code].id}/`
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
    <Box sx={{ padding: '6px' }}>
      <CenteredElement>
        {loading ? (
          <SkeletonStatsAgeSexPyramidPlotly />
        ) : chartData !== undefined ? (
          <React.Fragment>
            <PlotlyInteraction plotData={chartData} fullParentHeight={false} />
          </React.Fragment>
        ) : (
          <></>
        )}
      </CenteredElement>
    </Box>
  );
};
