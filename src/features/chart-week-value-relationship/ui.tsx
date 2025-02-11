import React, { useEffect, useState } from 'react';
import {SingleDatasetService} from '../../shared/api/services/SingleDatasetService';
import DatasetSpecificationChart from '../../entities/dataset-specification-chart/ui';
import { CenteredElement } from '../../pages/traces/ui/ui.styled';
import { Skeleton } from '@mui/material';
import { StyledBox } from './ui.styled';
import { useActiveRegion } from '../../shared/model/useActiveRegion';
import { useActiveLab } from '../../shared/model/useActiveLab';
import { useActiveParameter } from '../../shared/model/useActiveParameter';
import { useRegionsCore } from '@org/store-redux';
import { useActiveAgeRange } from '../../shared/model/useActiveAgeRange';
import { useActiveHumanSex } from '../../shared/model/useActiveHumanSex';
import { type IChartRequestParams } from 'types';
import { ChartIds } from '../../entities/dataset-specification-chart/constants';
import { type ChartId } from 'types';

// TODO - Сделать универсальный скелетон
function SkeletonReportView(): React.ReactNode {
  return (
    <>
      <Skeleton variant="rectangular" width="100%" height="20px" />
      <div style={{ height: '10px' }} />
      <Skeleton variant="rectangular" width="100%" height="500px" />
    </>
  );
}

function isDataReadyForRequest({ region, lab, parameter, minAge, maxAge, humanSex }: IChartRequestParams): boolean {
  return (
    region.data !== undefined &&
    lab.data !== undefined &&
    parameter.data !== undefined &&
    minAge !== undefined &&
    maxAge !== undefined &&
    humanSex !== undefined
  );
}

const ChartWeekValueRelationship = (): React.ReactNode => {
  const chartId: ChartId = ChartIds.WEEK_VALUE_RELATIONSHIP;
  const lab = useActiveLab();
  const parameter = useActiveParameter();
  const region = useActiveRegion();
  const regions = useRegionsCore();
  const [minAge, maxAge] = useActiveAgeRange();
  const humanSex = useActiveHumanSex();

  const [chartData, setChartData] = useState(undefined);

  const [loading, setLoading] = useState(true);

  useEffect((): void => {
    const getChart = async (): Promise<void> => {
      try {
        const response = await SingleDatasetService.requestWeekValueChartForSingleDatasetView({
          age_max: maxAge,
          age_min: minAge,
          dataset: lab.data,
          date: '2016-01-01',
          parameter: parameter.data,
          region: regions.data[region.data.iso_code].id,
          resolution: 'week',
          sex: parseInt(humanSex, 10)
        });

        setChartData(response);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    if (isDataReadyForRequest({ region, lab, parameter, minAge, maxAge, humanSex })) {
      setLoading(true);
      setTimeout((): void => {
        getChart();
      }, 10);
    } else {
      setChartData(undefined);
      setLoading(false);
    }
  }, [lab.data, parameter.data, region.data, minAge, maxAge, humanSex]);

  return (
    <StyledBox>
      <CenteredElement style={{ height: 'auto' }}>
        {loading ? (
          <SkeletonReportView />
        ) : chartData !== undefined ? (
          <DatasetSpecificationChart chartId={chartId} plotData={chartData} fullParentHeight={false} />
        ) : (
          <></>
        )}
      </CenteredElement>
    </StyledBox>
  );
};
export default ChartWeekValueRelationship;
