import styled from 'styled-components';
import { Panel } from 'reactflow';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';

export const StyledPanel = styled(Panel)`
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const RotatedVerticalAlignCenterIcon = styled(VerticalAlignCenterIcon)`
    transform: rotate(90deg);
`;
