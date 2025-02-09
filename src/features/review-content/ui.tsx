import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ReviewNumberOfRations from '../../entities/review-charts/review-number-of-patients/ui/ui';
import ReviewNumberOfObservationsNumber from '../../entities/review-charts/review-number-of-observations-number/ui/ui';
import ReviewNumberOfDataPointsNumber from '../../entities/review-charts/review-number-of-data-points-number/ui/ui';
import ReviewBarChartData from '../../entities/review-charts/review-bar-chart-data/ui/ui';
import ReviewLaboratoriesChartData from '../../entities/review-charts/review-laboratories-chart-data/ui/ui';
import ReviewPlotly from '../../entities/review-charts/review-plotly/ui/ui';

const ReviewContent = (): React.ReactNode => {
  return (
    <Box
      sx={{
        padding: 4
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={4}>
          <ReviewNumberOfRations />
        </Grid>
        <Grid item xs={4}>
          <ReviewNumberOfObservationsNumber />
        </Grid>
        <Grid item xs={4}>
          <ReviewNumberOfDataPointsNumber />
        </Grid>
        <Grid item xs={4}>
          <ReviewPlotly />
        </Grid>
        <Grid item xs={4}>
          <ReviewLaboratoriesChartData />
        </Grid>
        <Grid item xs={4}>
          <ReviewBarChartData />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ReviewContent;
