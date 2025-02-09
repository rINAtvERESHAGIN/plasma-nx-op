import styled from 'styled-components';
import { Accordion, AccordionSummary, Button } from '@mui/material';

export const AccordionContainer = styled.div`
    padding-bottom: 5px;
    font-size: 12px;
`;

export const StyledAccordion = styled(Accordion)`
    background-color: #efefef !important;
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
    min-height: 30px !important;
    height: 30px !important;
`;

export const ParsedPresetsLineContainer = styled.div`
    font-style: italic;
`;

export const KeyName = styled.span`
    font-weight: bold;
`;

export const StyledButton = styled(Button)`
    width: 100%;
`;
