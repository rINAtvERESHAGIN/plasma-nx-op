import { createBrowserRouter } from 'react-router-dom';
import ErrorRootBoundary from '../pages/error';
import { rootLoader } from '../pages/root/loader';
import { Root } from '../pages/root/ui';
import SuspenseWithFallBack from '../shared/ui/suspense-with-fallback/ui';
import { lazy } from 'react';
import { mainLoader } from '../pages/map/lib/loader';
import { loaderComparison } from '../shared';

const SplitMainPage = lazy(async () => ({ default: (await import('../pages/main-page-split/ui/ui')).SplitMainPage }));
const ParametersGallery = lazy(async () => ({ default: (await import('../pages')).ParametersGallery }));
const ParameterInfo = lazy(async () => ({ default: (await import('../pages')).ParameterInfo }));
const Review = lazy(async () => ({ default: (await import('../pages')).Review }));
const DatasetSpecifications = lazy(async () => ({ default: (await import('../pages')).DatasetSpecifications }));
const ProcessorsGallery = lazy(async () => ({ default: (await import('../pages')).ProcessorsGallery }));
const ResultFlow = lazy(async () => ({ default: (await import('../pages')).ResultFlow }));

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
      },
      {
        path: 'parameters-gallery',
        element: (
          <SuspenseWithFallBack>
            <ParametersGallery />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'parameterInfo/:parameterId',
        element: (
          <SuspenseWithFallBack>
            <ParameterInfo />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'review',
        element: (
          <SuspenseWithFallBack>
            <Review />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'comparison',
        element: <DatasetSpecifications />,
        loader: loaderComparison
      },
      // {
      //   path: 'blocknote',
      //   element: <BlocknoteCore />
      // },
      {
        path: 'processors-gallery',
        element: <ProcessorsGallery />
      },
      {
        path: 'result-flow',
        element: <ResultFlow />
      },
    ]
  }
]);
