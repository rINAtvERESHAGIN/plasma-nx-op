import styled, { keyframes } from 'styled-components';
import { Card } from '@mui/material';

const hideItems = keyframes`
  0% {
    margin-top: 0;
  }
  30% {
    opacity: 1;
  }
  60% {
    opacity: 0;
    transform: scale(0.98);
  }
  80% {
    transform: scale(0.5);
  }
  100% {
    opacity: 0;
    transform: scale(0);
    margin-top: -25%;
  }
`;

const showItems = keyframes`
  100% {
    opacity: 1;
    margin-top: 0;
    transform: scale(1);
  }
  10% {
    opacity: 0;
  }
  0% {
    opacity: 0;
    transform: scale(0.95);
    margin-top: -25%;
  }
`;

export const StackedCardsContainer = styled.div`
  position: relative;
  /* max-width: 500px; */
  /* margin: auto; */
  height: auto;

  &.closed .fileInput:first-of-type {
    box-shadow:
      0 3px 4px -2px rgba(0, 0, 0, 0.1),
      0 10px 0 -4px #e3e3e3,
      0 21px 0 -10px #cdcdcd,
      0 21px 5px -8px rgba(0, 0, 0, 0.1);
    transition: box-shadow ease 300ms;
    transition-delay: 250ms;
  }

  &.closed .fileInput:not(:first-of-type) {
    animation: ${hideItems} 1s forwards;
    animation-timing-function: ease;
  }

  &.showing .fileInput:first-of-type {
    box-shadow: 0 3px 4px -2px rgba(0, 0, 0, 0.1);
    transition: box-shadow ease 300ms;
  }

  &.showing .fileInput:not(:first-of-type) {
    animation: ${showItems} 700ms forwards;
    animation-timing-function: ease;
  }
`;

export const StackedCard = styled(Card)<{ index: number; scope: number }>`
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 80%;
  border-radius: 15px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  background: #fff;
  height: auto;
  margin-bottom: 10px;
  position: relative;

  &:nth-of-type(${({ index }) => index}) {
    cursor: pointer;
    z-index: ${({ index, scope }) => scope - index};
  }
`;

export const CardHeaderAction = styled.div`
  ${StackedCard}:hover & {
    /* visibility: visible; */
    opacity: 1;
    transition: opacity ease;
    transition-duration: 1000ms;
  }

  opacity: 0;
  transition: opacity ease 300ms;
`;
