import { createTheme } from '@mui/material';

export const themeMui = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#1976d2'
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f'
    },
    error: {
      main: '#d32f2f'
    },
    warning: {
      main: '#ed6c02'
    }
  }
});
