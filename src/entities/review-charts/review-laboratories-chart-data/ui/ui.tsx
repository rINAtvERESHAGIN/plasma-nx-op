import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Chart from 'react-apexcharts';
import { useAppSelector } from '@app/store';
import { ReviewLaboratoriesChartDataCardContent, StyledCard } from './ui.styled';
import { useInView } from 'react-intersection-observer';

const ReviewLaboratoriesChartData = (): React.ReactNode => {
  const observationsPerLab = useAppSelector((state) => state.reviewChart.observationsPerLab);
  const [chartDataSeries, setChartDataSeries] = useState([]);
  const { ref, inView } = useInView({
    threshold: 0
  });

  const chartDataOptions = {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: observationsPerLab.map((observation) => observation.lab)
    },
    colors: observationsPerLab.map((observation) => observation.colors)
  };

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setChartDataSeries([
          {
            name: 'Observations',
            data: observationsPerLab.map((observation) => observation.count)
          }
        ]);
      }, 300);
    } else {
      setChartDataSeries([]);
    }
  }, [inView]);

  return (
    <StyledCard ref={ref}>
      <ReviewLaboratoriesChartDataCardContent>
        <Typography variant="h5" component="div" color="#0a0a5e">
          По лабораториям
        </Typography>
        {chartDataOptions && chartDataSeries ? (
          <Chart options={chartDataOptions} series={chartDataSeries} type="bar" height={650} />
        ) : null}
      </ReviewLaboratoriesChartDataCardContent>
    </StyledCard>
  );
};
export default ReviewLaboratoriesChartData;
