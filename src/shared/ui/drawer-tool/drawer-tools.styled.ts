
import { type DrawerProps } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

export const DrawerHeader = muiStyled('div', {
  shouldForwardProp: (prop) => prop !== 'lowerCase' && prop !== 'anchor'
})<{ anchor: DrawerProps['anchor']; }>(({ anchor, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: anchor === 'left' ? 'flex-end' : 'flex-start',
  ...theme.mixins.toolbar
}));
