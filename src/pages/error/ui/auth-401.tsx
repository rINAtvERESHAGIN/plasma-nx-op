import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Typography } from '@mui/material';
import { type CommponErrorComponentProps } from "../../../../types/src/lib/CommponErrorComponentProps";
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { ErrorLayout } from './ui.styled';
import { LoadingScreenContainer } from '../../../shared/ui/styled/loading-container';


function Auth401({ status, data, statusText }: CommponErrorComponentProps): React.ReactNode {
  const navigate = useNavigate();

  useEffect(() => {
    if (status && data) {
      navigate(`/login-page/${data.afterAuth}`);
    }
  }, [status, data]);

  return (
    <ErrorLayout>
      <LoadingScreenContainer>
        <Avatar sx={{ bgcolor: red[500] }}>
          <CloseIcon />
        </Avatar>
        <Typography variant="h5">Ошибка аутентификации</Typography>
        <Typography variant="body1">
                    Вы не аутентифицированы, сейчас вас перенаправит на форму аутентификации
        </Typography>
      </LoadingScreenContainer>
    </ErrorLayout>
  );
}

export default Auth401;
