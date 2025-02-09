import styled from '@emotion/styled';
import { animated } from 'react-spring';

export const Body = styled.div`
background-color: #171717;
width: 100%;
height: 100%;
`;

export const DividerLine = styled.span`
width: 1px;
height: 100%;
border-radius: 2px;
background-color: rgba(1, 1, 1, 0.1);
`;

export const Dot = styled(animated.div)`
    position: fixed;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    height: 6px;
    min-width: 30px;
    background-color: grey;
    border-radius: 3px;
    z-index: 1000;
`;