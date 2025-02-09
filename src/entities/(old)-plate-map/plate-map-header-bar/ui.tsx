import React from 'react';
import styled from '@emotion/styled';
import {
  AppBar, type AppBarProps, Toolbar
} from '@mui/material';

const CustomAppBar = styled(AppBar)`
  background: #FFFFFF;
  border-radius: 20px 20px 0 0;
  box-shadow: none;
  margin-bottom: 4px;
`;

const CustomToolbar = styled(Toolbar)`
  background: #FFFFFF;
  border-radius: 20px 20px 0 0;
`;

interface IProps extends AppBarProps {

}

export function PlateMapHeaderBar (props: IProps): React.ReactNode {
  return (
    <CustomAppBar {...props} position="static">
      <CustomToolbar />
    </CustomAppBar>
  );
}
