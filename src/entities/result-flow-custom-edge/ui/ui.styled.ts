import styled from 'styled-components';

interface StyledEdgeLabelProps {
  labelX: number;
  labelY: number;
  backgroundColor: string;
}

export const StyledEdgeLabel = styled.div<StyledEdgeLabelProps>`
  position: absolute;
  transform: ${(props) => `translate(-50%, -50%) translate(${props.labelX}px, ${props.labelY}px)`};
  background: ${(props) => props.backgroundColor || 'grey'};
  padding: 2px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 10px;
  font-weight: 700;
  color: white;
  pointer-events: all;
`;
