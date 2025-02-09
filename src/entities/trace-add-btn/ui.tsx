import React from 'react';
import { Button, type ButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type IProps = ButtonProps

function ComparisonAddBtn ({ onClick }: IProps): React.ReactNode {
  return (
    <Button variant="text" startIcon={<AddIcon />} onClick={onClick}>
            Добавить
    </Button>
  );
}

export default ComparisonAddBtn;
