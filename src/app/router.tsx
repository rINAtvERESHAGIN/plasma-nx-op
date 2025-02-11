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
const ResultFlow = lazy(async () => ({ default: (await import('../pages')).ResultFlowWithReactFlowProvider }));
const PersonalAccountPage = lazy(async () => ({ default: (await import('../pages')).PersonalAccountPage }));
const EpidemiologistPage = lazy(async () => ({ default: (await import('../pages')).EpidemiologistPage }));
const LabPage = lazy(async () => ({ default: (await import('../pages')).LabPage }));
const AnomalyPage = lazy(async () => ({ default: (await import('../pages')).AnomalyPage }));
const TrendPage = lazy(async () => ({ default: (await import('../pages')).TrendPage }));
const BiochemicalProfiles = lazy(async () => ({ default: (await import('../pages')).BiochemicalProfiles }));
const RegionsComparison = lazy(async () => ({ default: (await import('../pages')).RegionsComparison }));
const CohortComparisonPage = lazy(async () => ({ default: (await import('../pages')).CohortComparisonPage }));
const LoginPage = lazy(async () => ({ default: (await import('../pages')).LoginPage }));
const GlobeMapBox = lazy(async () => ({ default: (await import('../pages')).GlobeMapBox }));

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
        element: (
          <SuspenseWithFallBack>
            <DatasetSpecifications />
          </SuspenseWithFallBack>
        ),
        loader: loaderComparison
      },
      // {
      //   path: 'blocknote',
      //   element: <BlocknoteCore />
      // },
      {
        path: 'processors-gallery',
        element: (
          <SuspenseWithFallBack>
            <ProcessorsGallery />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'result-flow',
        element: (
          <SuspenseWithFallBack>
            <ResultFlow />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'personal-account',
        element: (
          <SuspenseWithFallBack>
            <PersonalAccountPage />
          </SuspenseWithFallBack>
        )
      },
      {
        id: 'epidemiologist-review',
        path: 'epidemiologist-review',
        element: (
          <SuspenseWithFallBack>
            <EpidemiologistPage />
          </SuspenseWithFallBack>
        ),
        loader: mainLoader
      },
      {
        path: 'lab-page',
        element: (
          <SuspenseWithFallBack>
            <LabPage />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'anomaly-page',
        element: (
          <SuspenseWithFallBack>
            <AnomalyPage />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'trend',
        element: (
          <SuspenseWithFallBack>
            <TrendPage />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'biochemical-profiles',
        element: (
          <SuspenseWithFallBack>
            <BiochemicalProfiles />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'regions-comparison',
        element: (
          <SuspenseWithFallBack>
            <RegionsComparison />
          </SuspenseWithFallBack>
        )
      },
      {
        path: 'cohort-comparison',
        element: (
          <SuspenseWithFallBack>
            <CohortComparisonPage />
          </SuspenseWithFallBack>
        )
      }
    ]
  },
  {
    path: '/login-page/:afterAuth',
    element: (
      <SuspenseWithFallBack>
        <LoginPage />
      </SuspenseWithFallBack>
    )
  },
  {
    path: 'mapbox',
    element: <GlobeMapBox />,
    loader: rootLoader
  }
]);
