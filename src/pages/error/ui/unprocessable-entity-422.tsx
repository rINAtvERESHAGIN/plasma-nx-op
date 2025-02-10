import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Link, Typography } from '@mui/material';
import { CommponErrorComponentProps, HttpErrorsCodes } from "types";
import { ErrorLayout } from './ui.styled';
import { LoadingScreenContainer } from '../../../shared/ui/styled/loading-container';

function UnprocessableEntity422 ({ status }: CommponErrorComponentProps): React.ReactNode {
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = useState<HttpErrorsCodes | undefined>(undefined);

  useEffect(() => {
    if (!errorStatus && status === 422) {
      setErrorStatus(status as unknown as HttpErrorsCodes);
    }
  }, [errorStatus, status]);

  const handleOnClickLink = useCallback(() => {
    if (navigate) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <ErrorLayout>
      <LoadingScreenContainer>
        <Avatar>
          <CloseIcon />
        </Avatar>
        <Typography variant="h5">Ошибка загрузки данных</Typography>
        <Typography variant="body1" color="seattle100">
          Проверти правильность номера заявки и
          <Link onClick={handleOnClickLink}>{' повторите попытку'}</Link>
          , если это не происходит, то сообщите нам, пожалуйста, через Портал 2000
        </Typography>
      </LoadingScreenContainer>
    </ErrorLayout>
  );
}

export default UnprocessableEntity422;
