import React from 'react';
import { type GridColDef, type GridRowsProp } from '@mui/x-data-grid';
import { StyledDataGrid, TableContainer } from './ui.styled';

interface TableDataGridProps {
  rows: GridRowsProp;
  columns: GridColDef[];
}

const DatasetSpecificationTable: React.FC<TableDataGridProps> = ({ rows, columns }) => {
  const isLoading = rows.length === 0 || columns.length === 0;

  return (
    <TableContainer>
      <StyledDataGrid rows={rows} columns={columns} loading={isLoading} disableSelectionOnClick />
    </TableContainer>
  );
};

export default DatasetSpecificationTable;
