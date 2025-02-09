import styled from 'styled-components';
import { createTheme } from '@mui/material/styles';
import '@fontsource/geologica';

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#FFF',
          maxWidth: 'none',
          width: '500px',
          color: '#242529',
          fontFamily: 'Geologica',
          fontSize: '12px',
          lineHeight: '20px',
          whiteSpace: 'pre-line',
          borderRadius: '14px',
          padding: '14px',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.05)',
          boxSizing: 'border-box'
        },
        arrow: {
          color: '#FFF'
        }
      }
    }
  }
});
export default theme;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
