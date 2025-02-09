import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { StyledButton } from './StyledButton';

export interface StyledButtonProps {
  disabled?: boolean
}

interface UploadButtonProps {
  disabled?: boolean
  onClick?: () => void
}

const DatasetSpecificationsUploadButton: React.FC<UploadButtonProps> = ({ disabled, onClick }) => (
  <StyledButton variant="text" startIcon={<CloudUploadIcon />} disabled={disabled} onClick={onClick}>
    Отправить DatasetSpecifications
  </StyledButton>
);

export default DatasetSpecificationsUploadButton;
