import React, { type PropsWithChildren, Suspense } from 'react';
import LoaderScreen from '../../ui/loading-screen/loader';

const SuspenseWithFallBack = ({ children }: PropsWithChildren): React.ReactNode => {
  return <Suspense fallback={<LoaderScreen />}>{children}</Suspense>;
};

export default SuspenseWithFallBack;
