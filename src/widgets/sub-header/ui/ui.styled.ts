import styled from '@emotion/styled';
import { Toolbar } from '@mui/material';

export const SubHeaderHeight = '32px';
export const SubHeader = styled(Toolbar)`
  border-top: 1px solid #EBEBFF;
  min-height: 32px; !important;
  height: ${SubHeaderHeight};
  background-color: #FCFEFD;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
