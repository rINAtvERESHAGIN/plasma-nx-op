import React from 'react';
import { Chip, type ChipProps, ThemeProvider } from '@mui/material';
import theme from './ui.styled';
import '@fontsource/geologica';

interface IProps extends ChipProps {}

export const Tag = ({ ...props }: IProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Chip {...props} />
    </ThemeProvider>
  );
};
