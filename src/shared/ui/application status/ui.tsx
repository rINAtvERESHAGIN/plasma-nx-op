import React from 'react';
import { useAppSelector } from '@org/store-plasma';

const ApplicationStatus = (): React.ReactNode => {
  const applicationStatus = useAppSelector((state) => state.applicationStatus.status);

  return <>{applicationStatus === 'loading' ? <LoadingScreen /> : null}</>;
};

export default ApplicationStatus;
