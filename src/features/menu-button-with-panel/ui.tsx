import React, { type FunctionComponent, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuButton, MenuPanel } from '@plasma/ui';
import { isNil } from 'lodash';
import { type MenuButtonWithPanelProps } from './type';
import { StyledLink } from './ui.styled';

export const MenuButtonWithPanel: FunctionComponent<MenuButtonWithPanelProps> = ({ buttonText, menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isActive = menuItems.some((item) => location.pathname === item.route);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleItemClick = (label: string): void => {
    const menuItem = menuItems.find((item) => item.label === label);
    if (!isNil(menuItem)) {
      navigate(menuItem.route);
    }
    handleClose();
  };

  const menuLinks = useMemo(
    () =>
      menuItems.map((item) => (
        <StyledLink key={item.label} to={item.route}>
          {item.label}
        </StyledLink>
      )),
    [menuItems]
  );

  return (
    <>
      <MenuButton onClick={handleClick} isActive={isActive || open}>
        {buttonText}
      </MenuButton>
      <MenuPanel
        menuItems={menuLinks}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        handleMenuItemClick={handleItemClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      />
    </>
  );
};
