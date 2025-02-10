import React from 'react';
import { Drawer, type DrawerProps } from '@mui/material';

interface IProps extends DrawerProps {}

const WidgetDrawer = ({ anchor, open, children, onClose, ...otherProps }: IProps): React.ReactNode => {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose} {...otherProps}>
      {children}
    </Drawer>
  );
};

export default WidgetDrawer;
