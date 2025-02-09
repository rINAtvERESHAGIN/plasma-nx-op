import * as React from 'react';
import Drawer, { type DrawerProps } from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DrawerHeader } from './drawer-tools.styled';
import { type ToggleDrawer } from '@pages/blocknote/blocknote-core.types';

interface DrawerToolsProps {
    open: boolean;
    toggleDrawer: ToggleDrawer;
    children: React.ReactNode;
    anchor: DrawerProps['anchor'];
    width: string | number;
}

interface DrawerCloseButtonProps extends Pick<DrawerToolsProps, 'anchor' | 'toggleDrawer'> {}

const DrawerCloseButton: React.FunctionComponent<DrawerCloseButtonProps> = ({ anchor, toggleDrawer }) => {
  return (
    <IconButton onClick={toggleDrawer(null)}>
      {anchor === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  );
};
export const DrawerTools: React.FunctionComponent<DrawerToolsProps> = ({
  open,
  width,
  anchor,
  children,
  toggleDrawer
}) => {
  return (
    <Drawer
      open={open}
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width
        }
      }}
      anchor={anchor}
      onClose={toggleDrawer(null)}
    >
      <DrawerHeader anchor={anchor}>
        <DrawerCloseButton anchor={anchor} toggleDrawer={toggleDrawer} />
      </DrawerHeader>
      <Divider />
      {children}
    </Drawer>
  );
};

DrawerTools.defaultProps = {
  anchor: 'left'
};
