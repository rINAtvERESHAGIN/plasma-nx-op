import React, { type PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  height: 100%;
  background-color: #f8f8f8;
  padding: 32px;
  overflow: hidden;
`;

export function PlateMapWorkZone ({ children }: PropsWithChildren): React.ReactNode {
  return (
    <Container>
      {children}
    </Container>
  );
}
