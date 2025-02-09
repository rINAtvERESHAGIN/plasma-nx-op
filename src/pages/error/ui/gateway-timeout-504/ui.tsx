import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { Avatar, Typography } from '@mui/material';
import { LoadingScreenContainer } from '@shared/ui/styled/loading-container';
import { ErrorLayout } from '../ui.styled';

function Error504 (): React.ReactNode {
  return (
    <ErrorLayout>
      <LoadingScreenContainer>
        <Avatar>
          <CloseIcon />
        </Avatar>
        <Typography variant="h5">504 Gateway Timeout</Typography>
        <Typography variant="body1">Извините, сервер слишком долго отвечает.</Typography>
      </LoadingScreenContainer>
    </ErrorLayout>
  );
}

export default Error504;
