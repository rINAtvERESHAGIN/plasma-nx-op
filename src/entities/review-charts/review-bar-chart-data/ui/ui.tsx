import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Chart from 'react-apexcharts';
import { ReviewBarChartDataCardContent, StyledCard } from './ui.styled';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@org/store-redux';

interface ChartOptions {
  chart: {
    id: string;
  };
  xaxis: {
    categories: string[];
  };
  toolbar: Record<string, any>;
}

interface ChartSeries {
  name: string;
  data: number[];
}

const ReviewBarChartData = (): React.ReactNode => {
  const dataPointsPerYear = useAppSelector((state) => state.reviewChart.dataPointsPerYear);
  const [chartDataSeries, setChartDataSeries] = useState<ChartSeries[]>([]);
  const categories = dataPointsPerYear.map((dataPoint) => dataPoint.year.toString());
  const { ref, inView } = useInView({
    threshold: 0
  });

  const chartDataOptions: ChartOptions = {
    chart: {
      id: 'review-bar-chart'
    },
    xaxis: {
      categories
    },
    toolbar: {}
  };

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setChartDataSeries([
          {
            name: 'Data Points',
            data: dataPointsPerYear.map((dataPoint) => dataPoint.count)
          }
        ]);
      }, 100);
    } else {
      setChartDataSeries([]);
    }
  }, [inView]);

  return (
    <StyledCard ref={ref}>
      <ReviewBarChartDataCardContent>
        <Typography variant="h5" component="div" color="#0a0a5e">
          По годам
        </Typography>
        {chartDataOptions && chartDataSeries ? (
          <Chart options={chartDataOptions} series={chartDataSeries} type="bar" height={650} />
        ) : null}
      </ReviewBarChartDataCardContent>
    </StyledCard>
  );
};

export default ReviewBarChartData;
