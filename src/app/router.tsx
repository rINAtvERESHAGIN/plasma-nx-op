import { createBrowserRouter } from 'react-router-dom';
import ErrorRootBoundary from '../pages/error';
import { rootLoader } from '../pages/root/loader';
import { Root } from '../pages/root/ui';
import SuspenseWithFallBack from '../shared/ui/suspense-with-fallback/ui';
import { lazy } from 'react';
import { mainLoader } from '../pages/map/lib/loader';

const SplitMainPage = lazy(
  async () => await import(/* webpackChunkName: 'SplitMainPage' */ '../pages/main-page-split/ui/ui')
);

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorRootBoundary />,
    loader: rootLoader,
    element: <Root />,
    children: [
      {
        path: 'new-page',
        element: <Root />
      },
      {
        id: 'main',
        path: 'main',
        element: (
          <SuspenseWithFallBack>
            <SplitMainPage />
          </SuspenseWithFallBack>
        ),
        loader: mainLoader
      }
    ]
  }
]);
