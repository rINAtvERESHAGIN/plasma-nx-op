import { Button, type ButtonProps } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

type IProps = ButtonProps

function DatasetSpecificationClearAllBth ({ onClick }: IProps): React.ReactNode {
  return (
    <Button variant="text" color="error" startIcon={<DeleteIcon />} onClick={onClick}>
      Очистить
    </Button>
  );
}

export default DatasetSpecificationClearAllBth;
