import { createTheme } from '@mui/material/styles';
import '@fontsource/geologica';

const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          height: '40px',
          padding: '6px 16px',
          borderRadius: '64px',
          fontFamily: 'Geologica',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '28px',
          '& .MuiSvgIcon-root': {
            width: '16px',
            height: '16px',
            paddingLeft: '16px',
          },
          '&.MuiChip-filled.MuiChip-colorPrimary': {
            backgroundColor: '#414961',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#47CBCA',
            },
          },
          '&.MuiChip-colorSecondary': {
            borderColor: '#414961',
            border: '2px solid #414961',
            backgroundColor: 'transparent',
            color: '#414961',
            '&:hover': {
              borderColor: '#47CBCA',
              color: '#47CBCA',
            },
          },
        },
        label: {
          padding: '0',
        },
      },
    },
  },
});

export default theme;
