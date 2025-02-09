import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';

function DatasetSpecificationUpdatePlot ({
  onAction,
  onClose,
  isLoading
}: {
  onAction: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClose: () => void
  isLoading: boolean
}): React.ReactNode {
  return (
    <>
      <LoadingButton loading={isLoading} variant="text" color="primary" size="small" onClick={onAction}>
                Обновить
      </LoadingButton>
      <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
}

export default DatasetSpecificationUpdatePlot;
