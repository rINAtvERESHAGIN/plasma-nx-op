import styled from 'styled-components';
import { type LevelClosing } from './ui';

export const ListUl = styled.div<{ openLevel: LevelClosing }>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: flex-start;
    align-items: center;
    /* visibility: visible; */
    visibility: ${({ openLevel }) => (openLevel === 'total' ? 'hidden' : 'visible')};
`;

export const ListUlItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    /* display: flex; */
`;
