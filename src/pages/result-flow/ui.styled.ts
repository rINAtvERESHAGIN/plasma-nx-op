import styled, { keyframes } from 'styled-components';
import ReactFlow, { MiniMap } from 'reactflow';
import { Alert } from '@mui/material';

export const FlowContainer = styled.div`
  width: calc(100vw - 97px);
  height: calc(100vh - 97px);
`;

export const bounceAnimation = keyframes`
0% {
    transform: translate(-50%, 0) scale(1); 
  }
  50% {
    transform: translate(-50%, 0) scale(2); 
  }
`;

export const StyledFlow = styled(ReactFlow)`
  background-color: #f3f3f3;
  .react-flow__handle {
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background-color: #1876d2;
  }

  .react-flow__handle.connecting {
    animation: ${bounceAnimation} 1600ms infinite ease-out;
  }
  .react-flow__node {
    &.selected {
      border-radius: 16px;
      box-shadow: 0 3px 7px rgba(0, 0, 0, 0.6);
    }
  }
`;

export const StyledMiniMap = styled(MiniMap)`
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ProducesCountAlert = styled(Alert)`
  position: absolute;
  bottom: 20px;
  left: 50px;
  background-color: white !important;
  z-index: 1000;
`;

export const SelectedEdgeAlert = styled(Alert)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white !important;
  z-index: 1000;
`;

export const ProducesSpan = styled.span`
  color: #2e7d32;
`;

export const RequiresSpan = styled.span`
  color: #1976d2;
`;
