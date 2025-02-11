import styled  from 'styled-components';
import Plot from 'react-plotly.js';
import { Box } from '@mui/material';

export const Container = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StyledPlot = styled(Plot)`
  width: 100%;
  height: 100%;
`;
