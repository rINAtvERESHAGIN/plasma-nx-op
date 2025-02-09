import React from 'react';
import styled from '@emotion/styled';
import { Backdrop } from '@mui/material';
import ThreeDotLoadingStatus from '../three-dots-loading-status/ui';

const CustomBackdrope = styled(Backdrop)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  position: relative;
  height: 100vh;
`;
function LoaderScreen(): React.ReactNode {
  return (
    <CustomBackdrope open>
      <ThreeDotLoadingStatus />
    </CustomBackdrope>
  );
}

export default LoaderScreen;
