import React, { useState } from 'react';
import { Alert, createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledCenteredColumnBox, StyledLoginFormContainer } from './ui.styled';
import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';
import { login } from './login';

const theme = createTheme();

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
  width: 100%;
  height: 100%;
  margin-top: 15%;
`;

export function LoginPage(): React.ReactNode {
  const { afterAuth } = useParams();

  const navigate = useNavigate();
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isAuth, setIsAuth] = useState(false);

  const handleOnChangeUserName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
    setErrorMessage('');
  };

  const handleOnChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    setIsAuth((prev) => !prev);
    event.preventDefault();
    try {
      await login(username, password);
      if (afterAuth) navigate(`/${afterAuth}`);
    } catch (error) {
      if (error.status === 401) {
        setErrorMessage('Ошибка авторизации');
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsAuth((prev) => !prev);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledCenteredColumnBox>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <StyledLoginFormContainer onSubmit={handleSubmit} noValidate>
            <TextField
              value={username}
              onChange={handleOnChangeUserName}
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              value={password}
              onChange={handleOnChangePassword}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errorMessage !== '' ? (
              <Alert sx={{ width: '100%', padding: '5px 0 5px 5px' }} severity="error">
                {errorMessage}
              </Alert>
            ) : null}

            <LoadingButton loading={isAuth} type="submit" fullWidth variant="contained">
              Войти
            </LoadingButton>
          </StyledLoginFormContainer>
        </StyledCenteredColumnBox>
      </Container>
    </ThemeProvider>
  );
}
