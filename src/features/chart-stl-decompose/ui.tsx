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
import { withConnectPlot } from '../../shared/ui/plotly-interaction/with-diagram';
import { useActiveAgeRange } from '../../shared/model/useActiveAgeRange';
import { useActiveHumanSex } from '../../shared/model/useActiveHumanSex';
import { type IChartRequestParams } from 'types';
import { ChartIds } from '../../entities/dataset-specification-chart/constants';
import { type ChartId } from 'types';
import { listenCustomEvent } from '../../features/plotly-wordstat/customEvents';

const PlotlyInteraction = withConnectPlot(DatasetSpecificationChart);

// TODO - Сделать универсальный скелетон
const SkeletonReportView: React.FunctionComponent = () => {
  return (
    <>
      <Skeleton variant="rectangular" width="100%" height="20px" />
      <div style={{ height: '10px' }} />
      <Skeleton variant="rectangular" width="100%" height="500px" />
    </>
  );
};

const isDataReadyForRequest = ({ region, lab, parameter, minAge, maxAge, humanSex }: IChartRequestParams): boolean => {
  return (
    region.data !== undefined &&
    lab.data !== undefined &&
    parameter.data !== undefined &&
    minAge !== undefined &&
    maxAge !== undefined &&
    humanSex !== undefined
  );
};

const ChartStlDecompose = (): React.ReactNode => {
  const chartId: ChartId = ChartIds.STL_DECOMPOSE;
  const lab = useActiveLab();
  const parameter = useActiveParameter();
  const region = useActiveRegion();
  const regions = useRegionsCore();
  const [minAge, maxAge] = useActiveAgeRange();
  const humanSex = useActiveHumanSex();
  const [wordStatData, setWordStatData] = useState(null);

  const [chartData, setChartData] = useState(undefined);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleWordStatUpdate = (event) => {
      setWordStatData(event.detail);
    };

    const unlisten = listenCustomEvent('wordStatDataUpdate', handleWordStatUpdate);

    return () => {
      unlisten();
    };
  }, []);

  useEffect((): void => {
    const getChart = async (): Promise<void> => {
      try {
        const response = await SingleDatasetService.requestTrendChartForSingleDatasetSTLDecomposeView({
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
      setTimeout(() => {
        getChart();
      }, 10);
    } else {
      setChartData(undefined);
      setLoading(false);
    }
  }, [lab.data, parameter.data, region.data, minAge, maxAge, humanSex]);

  useEffect(() => {
    if (chartData && wordStatData) {
      const wordStatTrace = {
        ...wordStatData.data[0],
        yaxis: 'y4'
      };

      const updatedChartData = {
        ...chartData,
        data: [...chartData.data.filter((trace) => trace.name !== 'Вордстат'), wordStatTrace],
        layout: {
          ...chartData.layout,
          yaxis4: {
            title: 'Количество запросов',
            overlaying: 'y',
            side: 'right'
          }
        }
      };

      setChartData(updatedChartData);
    } else if (chartData && !wordStatData) {
      const updatedChartData = {
        ...chartData,
        data: chartData.data.filter((trace) => trace.name !== 'Вордстат'),
        layout: {
          ...chartData.layout,
          yaxis4: undefined
        }
      };

      setChartData(updatedChartData);
    }
  }, [wordStatData]);

  return (
    <StyledBox>
      <CenteredElement style={{ height: 'auto' }}>
        {loading ? (
          <SkeletonReportView />
        ) : chartData !== undefined ? (
          <PlotlyInteraction chartId={chartId} plotData={chartData} fullParentHeight={false} />
        ) : (
          <></>
        )}
      </CenteredElement>
    </StyledBox>
  );
};
export default ChartStlDecompose;
