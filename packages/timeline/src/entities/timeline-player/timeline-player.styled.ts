import { Collapse } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 8px;
`;
export const PlayerContainer = styled(Container)`
  gap: 16px;
`;
export const HorizontalCollapse = styled(Collapse)`
  & .MuiCollapse-wrapperInner {
    width: 100%;
  }
`;
