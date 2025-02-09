import React, { type PropsWithChildren, Suspense } from 'react';
import LoaderScreen from '@shared/ui/loading-screen/loader';

const SuspenseWithFallBack = ({ children }: PropsWithChildren): React.ReactNode => {
  return <Suspense fallback={<LoaderScreen />}>{children}</Suspense>;
};

export default SuspenseWithFallBack;
