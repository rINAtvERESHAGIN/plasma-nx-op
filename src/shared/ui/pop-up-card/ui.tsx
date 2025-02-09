import React from 'react';
import { Button, Card, CardActions, CardContent, type CardProps, Typography } from '@mui/material';
import { type IRegion } from '@shared/api/yuh-client-api/models/Region';

interface IProps extends CardProps, IRegion {}

export const PopUpCard = ({ date, detector_now, name, code }: IProps): React.ReactNode => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Date: {date}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Detector now: {detector_now}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Name: {name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Code: {code}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
