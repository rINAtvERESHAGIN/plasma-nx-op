import React from 'react';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '@app/store';
import {
  ReviewNumberOfRationsCard,
  ReviewNumberOfRationsCardContent,
  ReviewNumberOfRationsEscalatorWarningIcon
} from './ui.styled';

const ReviewNumberOfRations = (props): React.ReactNode => {
  const numberOfPatients = useAppSelector((state) => state.reviewChart.patientsNumber);

  return (
    <ReviewNumberOfRationsCard style={props.style}>
      <ReviewNumberOfRationsCardContent>
        <ReviewNumberOfRationsEscalatorWarningIcon />
        <Typography variant="h5" component="div" color="white">
          Число пациентов
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 64 }} color="white">
          {numberOfPatients ?? 'Данных нет'}
        </Typography>
      </ReviewNumberOfRationsCardContent>
    </ReviewNumberOfRationsCard>
  );
};
export default ReviewNumberOfRations;
