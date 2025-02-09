import styled from 'styled-components';
import { ArrowBackIos } from '@mui/icons-material';

export const StyledFloatingLabel = styled.div<{ isHovered: boolean, showBefore: string, serialNumber: number }>`
    display: flex;
    flex-direction: row;
    gap: 4px;
    position: fixed;
    align-items: center;
    top: 50%;
    transform: translateY(100%);
    /* transform: translateX(0%); */
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
    /* transform: ${({ isHovered, showBefore }) => (isHovered ? 'translateX(0%)' : `translateX(${27}%)`)}; */
    transform: ${({ isHovered, showBefore }) => (isHovered ? 'translateX(0%)' : `translateX(${showBefore}%)`)};
    right: 0;
    cursor: pointer;
    z-index: 1000;
`;

export const IconMap = styled(ArrowBackIos)`
    /* display: block; */
    margin-right: 2px;
    width: auto;
    transform: rotate(180deg);
`;

export const Text = styled.span<{ isHovered: boolean }>`
    opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
`;
