import React from 'react';
import Typography from '@mui/material/Typography';
import {
  ReviewNumberOfDataPointsNumberBubbleChartIcon,
  ReviewNumberOfDataPointsNumberCard,
  ReviewNumberOfDataPointsNumberCardContent
} from './ui.styled';
import { useAppSelector } from '@org/store-redux';

const ReviewNumberOfDataPointsNumber = (props): React.ReactNode => {
  const dataPointsNumber = useAppSelector((state) => state.reviewChart.dataPointsNumber);

  return (
    <ReviewNumberOfDataPointsNumberCard style={props.style}>
      <ReviewNumberOfDataPointsNumberCardContent>
        <ReviewNumberOfDataPointsNumberBubbleChartIcon />
        <Typography variant="h5" component="div" color="white">
          Число точек данных
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 64 }} color="white">
          {dataPointsNumber ?? 'Данных нет'}
        </Typography>
      </ReviewNumberOfDataPointsNumberCardContent>
    </ReviewNumberOfDataPointsNumberCard>
  );
};
export default ReviewNumberOfDataPointsNumber;
