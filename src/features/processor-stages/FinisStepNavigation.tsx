import { Box, Button } from '@mui/material';
import React from 'react';

export const FinisStepNavigation = ({
    activeStep, handleBack
}: {
    activeStep: number;
    handleBack: (activeStep: number) => void;
}): React.ReactNode => {
    const handleOnBackClick = (): void => {
        handleBack(activeStep);
    };
    return (
        <Box sx={{ mb: 2 }}>
            <Button variant="outlined" onClick={handleOnBackClick} sx={{ mt: 1, mr: 1 }}>
                Назад
            </Button>
        </Box>
    );
};
