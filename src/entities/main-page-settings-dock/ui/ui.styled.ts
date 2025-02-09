import styled from '@emotion/styled';
import { animated } from '@react-spring/web';

export const DockContainer = styled(animated.div)`
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  align-items: flex-end;
  height: 58px;
  display: flex;
  padding: 10px;
  padding-bottom: 6px;
  gap: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.2);
  box-sizing: content-box;
  border-radius: 12px;
  transform-origin: center bottom;
`;