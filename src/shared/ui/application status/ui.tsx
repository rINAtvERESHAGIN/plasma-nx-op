import { useAppSelector } from '@org/store-redux';
import React from 'react';


const ApplicationStatus = (): React.ReactNode => {
  const applicationStatus = useAppSelector((state) => state.applicationStatus.status);

  return <>{applicationStatus === 'loading' ? <LoadingScreen /> : null}</>;
};

export default ApplicationStatus;
