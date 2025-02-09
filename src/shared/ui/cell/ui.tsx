import React, { useCallback } from 'react';
import styled from 'styled-components';
import { type ButtonProps } from '@mui/material';

export interface ICellProps extends Pick<ButtonProps, 'children'> {
  /**
   * Значение в процентах в значение от 0 до 1
   * которое нужно, что бы вычислить значение цвета. */
  colorMarker: number
  /**
   * Значение кода региона. */
  regionCode: string
  /**
   *  Значение для активации эффекта нажатия кнопки
   * */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => unknown
  /**
   * Обработка действия наведения мыши на ячейку hover */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => unknown
  /**
   * Обработка действия покидания мыши ячейки */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => unknown
}

const CellTemplate = styled.div<{
  backGroundMarker?: string
  colorGradientPercent?: number
  clickable?: boolean
}>`
  background-color: ${({ colorGradientPercent }) => (colorGradientPercent ?? colorGradientPercent === 0
  // ? `hsl( ${((1 - colorGradientPercent) * 100).toFixed()} , 80%, 55%, 0.90)`
    ? `hsl( ${((1 - colorGradientPercent) * 100).toFixed()} , 77%, 54%)`
    : 'transparent')};
  height: 100%;
  width: 100%;
  transition: all ease 0.2s;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: 100%;

  /* поднятие элемента при наведении курсора*/
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px 2px rgba(0, 0, 0, 0.25);
  }
  
  /* эффект нажатия на кнопку*/
  ${({ clickable }) => clickable && `
  &:active {
    box-shadow: 0 10px 20px 2px rgba(0, 0, 0, 0.25);
    transform: translateY(4px);
  }
  `}
`;

export function Cell ({
  children, colorMarker, regionCode, onClick, onMouseLeave, onMouseEnter
}: ICellProps): React.ReactNode {
  const isClickable = React.useMemo<boolean>(() => Boolean(onClick), [onClick]);

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (onClick != null) {
      onClick(event);
    }
  };

  const handleOnMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
    if (onMouseEnter != null) {
      onMouseEnter(regionCode);
    }
  }, []);

  const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (onMouseLeave != null) {
      onMouseLeave('');
    }
  };

  return (
    <CellTemplate
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={(e) => { handleOnClick(e); }}
      clickable={isClickable}
      colorGradientPercent={colorMarker}>
      {children}
    </CellTemplate>
  );
}
