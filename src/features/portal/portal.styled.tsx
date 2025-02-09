import { styled as bStyled } from 'styled-components';
import { CustomBackdrop, PlotContainer } from '@pages/traces/ui/ui.styled';
import { type ContentWidth } from './portal.ui';
import MuiAccordion, { type AccordionProps } from '@mui/material/Accordion';
import styled from '@emotion/styled';
import * as React from 'react';
import { type Theme, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ContentProps {
  width: ContentWidth;
  paddingBottom?: string;
}

export const Content = bStyled.div<ContentProps>`
    width: ${({ width }) => width};
    padding: 16px;
    padding-top: 32px;
    border: 0.5px solid #dfe1e6;
    border-radius: 16px;
    padding-bottom:75px;
`;
export const CustomPlotContainer = bStyled(PlotContainer)`
    width: 100%;
    height: auto;
`;
export const UpdatedBackdrop = bStyled(CustomBackdrop)`
    position: relative;
    width: 100%;
`;

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }: { theme?: Theme }) => ({
  //   width: 'calc(100% - 90px)',
  width: '100%',
  border: 'none',
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}));

export const ExpandArea = ({
  summaryContent,
  expandContent,
  expanded,
  handleChange
}: {
  summaryContent: React.ReactNode;
  expandContent: React.ReactNode;
} & AccordionProps): React.ReactNode => {
  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      ></AccordionSummary>
      <AccordionDetails>{expandContent}</AccordionDetails>
    </Accordion>
  );
};
