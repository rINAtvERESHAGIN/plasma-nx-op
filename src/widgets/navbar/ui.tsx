import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuButton, MenuIconButton, User } from '@plasma/ui';
import { MenuButtonWithPanel } from '@features/menu-button-with-panel/ui';
import { ButtonsContainer } from './ui.styled';
import { freeAnalysisMenuItems } from './constants';

export const Navbar: React.FunctionComponent = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <ButtonsContainer>
      <Link to="/trend">
        <MenuButton isActive={currentPath === '/trend'}>Тренд</MenuButton>
      </Link>
      <Link to="/regions-comparison">
        <MenuButton isActive={currentPath === '/regions-comparison'}>Сравнение регионов</MenuButton>
      </Link>
      <Link to="/cohort-comparison">
        <MenuButton isActive={currentPath === '/cohort-comparison'}>Сравнение когорт</MenuButton>
      </Link>
      <Link to="/epidemiologist-review">
        <MenuButton isActive={currentPath === '/epidemiologist-review'}>Эпидемиологическая обстановка</MenuButton>
      </Link>
      <Link to="/anomaly-page">
        <MenuButton isActive={currentPath === '/anomaly-page'}>Аномалии</MenuButton>
      </Link>
      <Link to="/lab-page">
        <MenuButton isActive={currentPath === '/lab-page'}>Лабораторные исследования</MenuButton>
      </Link>
      <MenuButtonWithPanel buttonText="Свободный анализ" menuItems={freeAnalysisMenuItems} />
      <Link to="/personal-account">
        <MenuIconButton isActive={currentPath === '/personal-account'}>
          <User />
        </MenuIconButton>
      </Link>
    </ButtonsContainer>
  );
};
