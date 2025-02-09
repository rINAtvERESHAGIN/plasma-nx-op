import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuButton } from '@plasma/ui';
import { ButtonsContainer } from './ui.styled';

export const ComparisonMenuButton: React.FunctionComponent = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <ButtonsContainer>
      <Link to='/epidemiologist-review'>
        <MenuButton style={{ backgroundColor: '#414961' }} isActive={true}>
          Сравнение
        </MenuButton>
      </Link>
      <Link to='/anomaly-page'>
        <MenuButton style={{ color: ' #24252980' }} isActive={currentPath === '/anomaly-page'}>
          Коллекции
        </MenuButton>
      </Link>
    </ButtonsContainer>
  );
};
