import React from 'react';
import { Tooltip, type TooltipProps } from '@mui/material';
import { InfoIcon } from './InfoIcon';
import theme, { IconContainer } from './ui.styled';
import { ThemeProvider } from '@mui/material/styles';

interface InfoTooltipProps extends Omit<TooltipProps, 'children'> {}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Tooltip arrow title={title} {...props}>
        <IconContainer>
          <InfoIcon />
        </IconContainer>
      </Tooltip>
    </ThemeProvider>
  );
};

export default InfoTooltip;
