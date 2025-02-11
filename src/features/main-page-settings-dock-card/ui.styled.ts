import styled from '@emotion/styled';
import { animated } from 'react-spring';

export const DockCardContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 4px;
`;

export const DockCardButton = styled(animated.button)`
border-radius: 12px;
border: solid 1px rgba(255, 255, 255, 0.1);
background-color: #ffffff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
filter: saturate(0.9) brightness(0.95);
transition: filter 200ms;
padding: 0;
margin: 0;
cursor: pointer;

&:hover {
    filter: saturate(1) brightness(1.12);
}
`;

export const DockDot = styled(animated.div)`
width: 6px;
height: 6px;
border-radius: 50%;
background-color: #000000;
`;