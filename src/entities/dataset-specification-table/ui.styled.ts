import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

export const TableContainer = styled.div`
  height: 400px;
  width: 100%;
`;

export const StyledDataGrid = styled(DataGrid)`
  border-radius: 16px !important;
  & .MuiDataGrid-columnHeader:first-of-type {
    border-radius: 16px 0 0 0;
  }
  & .MuiDataGrid-columnHeader:last-of-type {
    border-radius: 0 16px 0 0;
  }
`;
