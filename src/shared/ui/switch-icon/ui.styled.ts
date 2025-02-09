import styled from '@emotion/styled';
import Fab from '@mui/material/Fab';

export const StyledFab = styled(Fab)<{ isActive?: boolean }>`
  background-color: #ffffff;
  border: ${(props) => (props.isActive ? '2px solid #2196f3' : '2px solid transparent')};
`;
