import React, { type ReactNode } from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import { CardContainer } from './ui.styled';

const StyledTooltip = styled(props => (
  <Tooltip classes={{ popper: props.className }} {...props} />
))`
  & .MuiTooltip-tooltip {
    font-size: 12px;
    z-index: 1000;
  }
`;

interface CardProps {
    children: ReactNode;
    title: string; 
}

export const Card = ({ children, title }: CardProps) => (
  <StyledTooltip placement="top" title={title} arrow>
    <CardContainer>{children}</CardContainer>
  </StyledTooltip>
);
