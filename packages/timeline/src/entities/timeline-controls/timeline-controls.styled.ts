import { IconButton } from '@mui/material';
import styled from 'styled-components';

export const ControlButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 500; // Make sure this is above all other content
`;
