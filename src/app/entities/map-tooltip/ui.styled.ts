import { styled } from 'styled-components';
import { type TooltipProps } from './type';

export const TooltipContainer = styled.div<TooltipProps>`
  position: absolute;
  background: #ffffff;
  border: 1px solid #e0f1f1;
  border-radius: 10px 10px 10px 0;
  padding: 6px 12px;
  pointer-events: none;
  font-size: 14px;
  line-height: 20px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  z-index: 1000;
`;
