import React, { type PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { type DrawerProps } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

const CustomDrawer = styled.div`
  background-color: #ffffff;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
`;

const MainContent = styled.div`
  height: auto;
  background-color: transparent;
  overflow: auto;
`;

interface IProps {
  props?: Omit<DrawerProps, 'children'>;
}

export const SideBar = ({ props, children }: PropsWithChildren<IProps>): React.ReactNode => {
  return (
    <CustomDrawer {...props}>
      <Toolbar />
      <Divider />
      <MainContent>{children}</MainContent>
    </CustomDrawer>
  );
};
