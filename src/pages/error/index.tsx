import React, { lazy } from 'react';
import { type ErrorResponse } from '@pages/error/lib/@error-types';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import SuspenseWithFallBack from '@shared/ui/suspense-with-fallback/ui';
import LoadingScreen from '@entities/loading-screen/ui';
import { Typography } from '@mui/material';
import { CustomToolBar, HeaderSignature } from '@pages/root/ui.styled';

const Auth401 = lazy(async () => await import(/* webpackChunkName: "Auth401" */ '@pages/error/ui/auth-401'));
const NotFound404 = lazy(
  async () => await import(/* webpackChunkName: "NotFound404" */ '@pages/error/ui/not-found-404')
);
const UnprocessableEntity422 = lazy(
  async () => await import(/* webpackChunkName: "UnprocessableEntity422" */ '@pages/error/ui/unprocessable-entity-422')
);
const BadGateway502 = lazy(
  async () => await import(/* webpackChunkName: "BadGateway502" */ '@pages/error/ui/bad-gateway-502')
);
const Error504 = lazy(
  async () => await import(/* webpackChunkName: "BadGateway502" */ '@pages/error/ui/gateway-timeout-504/ui')
);

function ErrorRootContent(): React.ReactNode {
  const error = useRouteError() as ErrorResponse;

  if (error) {
    if (isRouteErrorResponse(error)) {
      if (error.status === 401) {
        return (
          <SuspenseWithFallBack>
            <Auth401
              status={error.status}
              data={JSON.parse(error.data)}
              internal={false}
              statusText={error.statusText}
            />
          </SuspenseWithFallBack>
        );
      }
      if (error.status === 404) {
        return (
          <SuspenseWithFallBack>
            <NotFound404 />
          </SuspenseWithFallBack>
        );
      }
      if (error.status === 422) {
        return (
          <SuspenseWithFallBack>
            <UnprocessableEntity422
              status={error.status}
              data={undefined}
              internal={false}
              statusText={error.statusText}
            />
          </SuspenseWithFallBack>
        );
      }
      if (error.status === 502) {
        return (
          <SuspenseWithFallBack>
            <BadGateway502 status={error.status} data={undefined} internal={false} statusText={error.statusText} />
          </SuspenseWithFallBack>
        );
      }
      if (error.status === 504) {
        return (
          <SuspenseWithFallBack>
            <Error504 />
          </SuspenseWithFallBack>
        );
      }
    }
  }

  return <LoadingScreen />;
}

function ErrorRootBoundary(): React.ReactNode {
  return (
    <>
      <CustomToolBar>
        <HeaderSignature>
          <Typography variant="body1">Ошибка в YUH</Typography>
        </HeaderSignature>
      </CustomToolBar>
      <ErrorRootContent />
    </>
  );
}

export default ErrorRootBoundary;
