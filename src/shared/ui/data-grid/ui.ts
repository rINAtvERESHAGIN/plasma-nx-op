import styled from '@emotion/styled';
import {
  Table, TableBody, TableCell, TableFooter, TableHead, TableRow
} from '@mui/material';

export const DataGridTable = styled(Table)`
  table-layout: fixed;
  border-collapse:separate;
  border-spacing:0 16px;


  display: block;
  max-width: fit-content;
  margin: 0 auto;
  overflow-x: auto;
  white-space: nowrap;
`;

export const DataGridTableBody = styled(TableBody)``;

export const DataGridTableHead = styled(TableHead)`
  background: #FFFFFF;
`;

export const DataGridTableFooter = styled(TableFooter)``;

export const DataGridTableRow = styled(TableRow)<{ isfocus?: boolean }>`
  background-color: ${(props) => (props.isfocus ? 'rgba(25, 118, 210, 0.12)' : '#FFFFFF')};
  position: relative;
  height: 65px;
  border-radius: 18px;

  //
  padding: 12px;
  gap: 4px;
  min-width: 988px;


  &:hover {
    background-color: #e9eaea;
    z-index: 3;
  }

  & > td:first-child {
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
  }

  & > td:last-child {
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
  }
  & > th:first-child {
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
  }

  & > th:last-child {
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
  }
  
`;

export const DataGridTableData = styled(TableCell)`
  height: auto;
  border: none;
  text-align: left;
  padding: 8px;
  white-space: nowrap;
  min-width: 200px;
`;

export const DataGridTableHeader = styled(TableCell)`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #2B2D33;
  padding: 8px;
  border: none;
  white-space: nowrap;
  min-width: 200px;
`;
