import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingScreenContainer } from '../../../shared/ui/styled/loading-container';
import { ErrorLayout } from './ui.styled';
import { CommponErrorComponentProps, HttpErrorsCodes } from 'types';

function BadGateway502 ({ status }: CommponErrorComponentProps): React.ReactNode {
  const [errorStatus, setErrorStatus] = useState<HttpErrorsCodes | undefined>(undefined);

  useEffect((): void => {
    if (!errorStatus && status === 422) {
      setErrorStatus(status as unknown as HttpErrorsCodes);
    }
  }, [errorStatus, status]);

  return (
    <ErrorLayout>
      <LoadingScreenContainer>
        <Avatar color="nice10">
          <CloseIcon />
        </Avatar>
        <Typography variant="h5">Ошибка</Typography>
        <Typography variant="body1">Сервис временно недоступен</Typography>
      </LoadingScreenContainer>
    </ErrorLayout>
  );
}

export default BadGateway502;
