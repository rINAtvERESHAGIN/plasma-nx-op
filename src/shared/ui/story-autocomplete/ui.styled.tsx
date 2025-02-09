import { createTheme } from '@mui/material/styles';
import '@fontsource/geologica';

export const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: '100%',
          backgroundColor: '#FBFBFB',
          borderRadius: '14px',
          border: '1px solid #B0C4C9',
          boxSizing: 'border-box',
          '&:hover': {
            border: '1px solid #47CBCA'
          },
          '&.Mui-focused': {
            border: '1px solid #414961'
          },
          '& .MuiOutlinedInput-root': {
            padding: '14px 24px',
            '& .MuiAutocomplete-input': {
              padding: '0'
            }
          },
          '& .MuiSvgIcon-root': {
            width: '20px',
            height: '20px',
            color: '#242529'
          },
          '& .MuiAutocomplete-endAdornment': {
            marginRight: '13px'
          },
          '&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root, &.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root':
            {
              paddingRight: '50px'
            }
        },
        popper: {
          '& .MuiAutocomplete-paper': {
            borderRadius: '14px',
            boxShadow: '0px 4px 20px 0px #0000000D'
          }
        },
        listbox: {
          padding: '9px 0 0 0'
        },
        option: {
          height: '60px',
          padding: '16px 24px',
          borderBottom: '1px solid #F3F5F6',
          fontFamily: 'Geologica',
          fontSize: '14px',
          lineHeight: '28px',
          color: '#242529',
          boxSizing: 'border-box',
          // '&:not([aria-selected="true"]):hover': {
          //   backgroundColor: '#FFFFFF',
          //   color: '#47CBCA',
          // },

          // '&[aria-selected="true"]': {
          //   backgroundColor: '#FFFFFF',
          //   color: '#242529',
          // },

          // '&[aria-selected="true"].Mui-focused': {
          //   backgroundColor: '#FFFFFF',
          //   color: '#47CBCA',
          // },
          '&.Mui-focused': {
            backgroundColor: '#FFFFFF',
            color: '#47CBCA'
          },
          '&:last-of-type': {
            borderBottom: 'none'
          }
        },

        popupIndicator: {
          padding: '2px',
          marginRight: '0',
          '&:hover': {
            backgroundColor: '#E0F1F1'
          }
        }
        // tag: {
        //   display: 'none',
        // },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          height: 'auto',
          fontFamily: 'Geologica',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '28px',
          color: '#242529'
        },
        notchedOutline: {
          border: 'none'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#24252933',
          color: '#FFFFFF',
          fontFamily: 'Geologica',
          fontSize: '14px',
          lineHeight: '28px',
          padding: '0 8px',
          borderRadius: '500px',
          '&:hover': {
            backgroundColor: '#414961'
          }
        },
        deleteIcon: {
          color: '#FFFFFF',
          '&:hover': {
            color: '#FFFFFF'
          }
        }
      }
    }
  }
});
