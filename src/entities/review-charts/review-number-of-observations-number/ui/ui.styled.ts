import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import VaccinesIcon from '@mui/icons-material/Vaccines';

export const ReviewNumberOfObservationsNumberCard = styled(Card)`
  background-color: rgba(45, 45, 45, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
`;

export const ReviewNumberOfObservationsNumberCardContent = styled(CardContent)`
  text-align: center;
`;

export const ReviewNumberOfObservationsNumberVaccinesIcon = styled(VaccinesIcon)`
  font-size: 64px;
  color: white;
`;
