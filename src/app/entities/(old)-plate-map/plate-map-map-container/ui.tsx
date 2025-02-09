import React, { type PropsWithChildren } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #FFFFFF;
`;

function PlateMapMapContainer ({ children }: PropsWithChildren): React.ReactNode {
  return (
    <MapContainer>
      {children}
    </MapContainer>
  );
}

export default PlateMapMapContainer;
