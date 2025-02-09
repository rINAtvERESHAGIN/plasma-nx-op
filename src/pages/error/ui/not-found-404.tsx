import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
`;

const ErrorTitle = styled.h1`
    font-size: 48px;
    font-weight: bold;
    color: #222222;
    margin-bottom: 24px;
`;

const ErrorMessage = styled.p`
    font-size: 24px;
    color: #666666;
    margin-bottom: 24px;
`;

function NotFound404 (): React.ReactNode {
  return (
    <Container>
      <ErrorTitle>404</ErrorTitle>
      <ErrorMessage>Page Not Found</ErrorMessage>
    </Container>
  );
}

export default NotFound404;
