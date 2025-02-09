import React from 'react';
import LoaderScreen from '@shared/ui/loading-screen/loader';
import { Backdrop } from '@mui/material';

const LoadingScreen = (): React.ReactNode => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => 10001 }}
      open
    >
      <LoaderScreen />
    </Backdrop>
  );
};

export default LoadingScreen;
