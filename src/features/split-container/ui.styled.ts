import styled from 'styled-components';
import '@shared/styles/scroll.css';

export const SecondCenterContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const FirstPanelContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const ThirdCenterContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 8px;
`;

export const PanelCloseButton = styled.button.attrs({
  className: 'panel-close-button',
  'aria-label': 'Toggle panel'
})<{ panelSize: number; isReversed: boolean }>`
    span {
        height: 3px;
        margin: 2px 0;
        width: 15px;
        background: #000000;
        transition: 0.4s ease;
        border-radius: 10px;
        transform-origin: center;
    }

    span:first-child {
        position: absolute;
        transform: rotate(90deg);
        bottom: 55.5%;
    }

    span:nth-child(2) {
        position: absolute;
        transform: rotate(90deg);
        top: 55.5%;
    }

    &:hover span:first-child {
        transform: ${({ panelSize, isReversed }) =>
    `rotate(${panelSize > 200 ? (isReversed ? 60 : 120) : isReversed ? 120 : 60}deg)`};
    }

    &:hover span:nth-child(2) {
        transform: ${({ panelSize, isReversed }) =>
    `rotate(${panelSize > 200 ? (isReversed ? 120 : 60) : isReversed ? 60 : 120}deg)`};
    }
`;
