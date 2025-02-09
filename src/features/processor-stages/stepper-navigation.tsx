import { Box, Button } from '@mui/material';
import React from 'react';

export interface StepperNavigationProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: (activeStep: number) => void;
  handleReset: () => void;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
}
export const StepperNavigation: React.FC<StepperNavigationProps> = ({
  activeStep,
  handleNext,
  handleBack,
  handleReset,
  isNextDisabled,
  isBackDisabled
}) => {
  const handleOnBackClick = () => {
    handleBack(activeStep);
  };
  return (
    <Box sx={{ mb: 2 }}>
      <div>
        {activeStep !== 0 && (
          <Button disabled={isBackDisabled} onClick={handleOnBackClick} sx={{ mt: 1, mr: 1 }}>
            Назад
          </Button>
        )}
        {activeStep !== 2 && (
          <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }} disabled={isNextDisabled}>
            Продолжить
          </Button>
        )}
      </div>
    </Box>
  );
};
