import React, { useCallback, type FC } from 'react';
import { type EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge, useStore } from 'reactflow';
import { getEdgeParams } from '../ui/utils';
import { StyledEdgeLabel } from '../ui/ui.styled';

const RequiresEdge: FC<EdgeProps> = ({ id, source, target, data, markerEnd }) => {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: '#1976D2',
          strokeWidth: '1.5px'
        }}
      />
      <EdgeLabelRenderer>
        <StyledEdgeLabel labelX={labelX} labelY={labelY} backgroundColor={'#1976D2'}>
          {data.label}
        </StyledEdgeLabel>
      </EdgeLabelRenderer>
    </>
  );
};

export default RequiresEdge;
