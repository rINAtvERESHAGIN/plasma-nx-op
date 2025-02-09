import { type CSSObject, type Theme, styled } from '@mui/material';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { drawerWidth } from './ui.constants';
import { closedMixin, openedMixin, totalClosedMixin } from './ui.utils';
import { type LevelClosing } from './ui';

export const DrawerHeader = styled('div')(({ theme }) => ({
  height: '97px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const showTotalClosedButtonMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('height', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short
  }),
  height: '70px',
  visibility: 'visible'
});

const hideTotalClosedButtonMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('height', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short
  }),
  height: '0px',
  visibility: 'hidden'
});

export const DrawerToolBar = styled('div', {
  shouldForwardProp: (prop) => prop !== 'show'
})<{ show: boolean; openLevel: LevelClosing }>(({ theme, show, openLevel }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...(openLevel !== 'total' && show && { ...showTotalClosedButtonMixin(theme) }),
  ...(openLevel === 'total' && { ...hideTotalClosedButtonMixin(theme) }),
  ...(!show && { ...hideTotalClosedButtonMixin(theme) })
}));

interface AppBarProps extends MuiAppBarProps {
  openLevel: LevelClosing;
}

export const appBarHeight = 97;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, openLevel }) => ({
  background: '#fffeff',
  width: `calc(100% - ${appBarHeight}px)`,
  height: `${appBarHeight}px`,
  color: 'black',
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  zIndex: 1200,
  boxShadow: '0px 2px 4px -1px #f8f6f8,0px 4px 5px 0px #f8f6f8,0px 1px 10px 0px #f8f6f8',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(openLevel === 'open' && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  ...(openLevel === 'total' && {
    marginLeft: drawerWidth,
    width: 'calc(100% - 14px)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<{
  totalClosed: LevelClosing;
}>(({ theme, open, totalClosed }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '> .MuiDrawer-paper': {
    borderRight: 'none',
    background: '#f9f7f9'
  },
  ...(totalClosed === 'open' && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(totalClosed === 'part' && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  }),
  ...(totalClosed === 'total' && {
    ...totalClosedMixin(theme),
    '& .MuiDrawer-paper': totalClosedMixin(theme)
  })
}));
