import React from 'react';
import './styles.css';

function ThreeDotLoadingStatus (): React.ReactNode {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default ThreeDotLoadingStatus;
