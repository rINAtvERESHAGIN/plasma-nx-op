import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

export const ReviewNumberOfDataPointsNumberCard = styled(Card)`
  background-color: rgba(45, 45, 45, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
`;

export const ReviewNumberOfDataPointsNumberCardContent = styled(CardContent)`
  text-align: center;
`;

export const ReviewNumberOfDataPointsNumberBubbleChartIcon = styled(BubbleChartIcon)`
  font-size: 64px;
  color: white;
`;
