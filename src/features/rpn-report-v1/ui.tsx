import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@org/store-redux';
import Box from '@mui/material/Box';
import SingleDatasetService from '@shared/api/services/SingleDatasetService';
import DatasetSpecificationChart from '../../dataset-specification-chart/ui';
import { CenteredElement } from '@pages/traces/ui/ui.styled';
import { Skeleton } from '@mui/material';
import { useActiveRegion } from '@shared/model/useActiveRegion';
import { useActiveLab } from '@shared/model/useActiveLab';
import { useActiveParameter } from '@shared/model/useActiveParameter';

const SkeletonReportView = (): React.ReactNode => {
  return (
    <>
      <Skeleton variant="rectangular" width="100%" height="20px" />
      <div style={{ height: '10px' }} />
      <Skeleton variant="rectangular" width="100%" height="500px" />
    </>
  );
};

const ReportView = (): React.ReactNode => {
  const parameter = useActiveParameter();
  const lab = useActiveLab();
  const region = useActiveRegion();

  const regions = useAppSelector((state) => state.regions.data);

  const [chartData, setChartData] = useState(undefined);

  const [loading, setLoading] = useState(true);

  useEffect((): void => {
    const getChart = async (): Promise<void> => {
      try {
        const response = await SingleDatasetService.requestGetTrendChartForSingleDataset({
          age_max: 100,
          age_min: 0,
          dataset: lab.data,
          date: '2015-01-01',
          parameter: parameter.data,
          region: regions[region.data.code].id,
          resolution: 'week',
          sex: 0
        });

        setChartData(JSON.parse(response));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    if (region.data !== '' && lab.data !== '' && parameter.data !== '') {
      setLoading(true);
      setTimeout(() => {
        getChart();
      }, 10);
    } else {
      setChartData(undefined);
      setLoading(false);
    }
  }, [lab.data, parameter.data, region.data]);

  return (
    <Box sx={{ padding: 4 }}>
      <CenteredElement style={{ height: 700 }}>
        {loading ? (
          <SkeletonReportView />
        ) : chartData !== undefined ? (
          <DatasetSpecificationChart plotData={chartData} fullParentHeight />
        ) : (
          <></>
        )}
      </CenteredElement>
    </Box>
  );
};
export default ReportView;
