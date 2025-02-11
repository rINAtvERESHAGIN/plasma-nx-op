import React from 'react';
import Typography from '@mui/material/Typography';
import {
  ReviewNumberOfObservationsNumberCard,
  ReviewNumberOfObservationsNumberCardContent,
  ReviewNumberOfObservationsNumberVaccinesIcon
} from './ui.styled';
import { useAppSelector } from '@org/store-redux';

const ReviewNumberOfObservationsNumber = (props): React.ReactNode => {
  const observationsNumber = useAppSelector((state) => state.reviewChart.observationsNumber);

  return (
    <ReviewNumberOfObservationsNumberCard style={props.style}>
      <ReviewNumberOfObservationsNumberCardContent>
        <ReviewNumberOfObservationsNumberVaccinesIcon />

        <Typography variant="h5" component="div" color="white">
          Число наблюдений
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 64 }} color="white">
          {observationsNumber ?? 'Данных нет'}
        </Typography>
      </ReviewNumberOfObservationsNumberCardContent>
    </ReviewNumberOfObservationsNumberCard>
  );
};
export default ReviewNumberOfObservationsNumber;
