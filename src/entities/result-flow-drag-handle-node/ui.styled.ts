import styled from 'styled-components';
import { Handle } from 'reactflow';
import { Card } from '@mui/material';

export const StyledCard = styled(Card)`
    width: 300px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid ${(props) => props.backgroundColor || '#ddd'};
    border-radius: 16px !important;
    font-family: monospace;
    &:hover {
        width: 302px;
        border: 2px solid ${(props) => props.backgroundColor || '#ddd'};
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
    }
    background-color: #f3f4f7 !important;
`;

export const CardTitle = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.backgroundColor || '#f9f9f9'};
    font-size: 16px;
    font-weight: bold;
    color: white;
`;

export const CardContentTitle = styled.span`
    margin-left: 5px;
    font-style: italic;
    font-size: 14px;
    font-weight: bold;
`;

export const CardContent = styled.div`
    margin: 0 5px 10px 10px;
`;

export const LineContainer = styled.div`
    font-size: 12px;
`;

export const ParsedPresetsLineContainer = styled.div`
    font-size: 12px;
    font-style: italic;
`;

export const KeyName = styled.span`
    font-weight: bold;
`;

export const StyledHandle = styled(Handle)`
    margin: -3px 0;
`;
