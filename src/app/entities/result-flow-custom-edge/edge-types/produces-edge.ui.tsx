import React, { useCallback, type FC } from 'react';
import { type EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge, useStore, useReactFlow } from 'reactflow';
import { ToggleButton } from '@mui/material';
import { getEdgeParams } from '../ui/utils';
import { StyledEdgeLabel } from '../ui/ui.styled';
import CloseIcon from '@mui/icons-material/Close';

const ProducesEdge: FC<EdgeProps> = ({ id, source, target, data, markerStart }) => {
  const reactFlowInstance = useReactFlow();
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

  const onEdgeClick = useCallback(() => {
    const allEdges = reactFlowInstance.getEdges();

    // Обновление состояния текущего ребра на активное
    const updatedCurrentEdge = {
      ...allEdges.find((edge) => edge.id === id),
      data: {
        ...allEdges.find((edge) => edge.id === id).data,
        isActive: true
      }
      // animated: true,
    };

    // Фильтрация и обновление связанных рёбер на неактивные
    const updatedOtherEdges = allEdges
      .filter((edge) => data.otherProducesEdges.includes(edge.id))
      .map((edge) => ({
        ...edge,
        data: {
          ...edge.data,
          isActive: false
        }
        // animated: false,
      }));

    // Объединение текущего обновлённого ребра с обновлёнными связанными рёбрами
    reactFlowInstance.setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        const foundUpdatedEdge = [updatedCurrentEdge, ...updatedOtherEdges].find((e) => e.id === edge.id);
        return foundUpdatedEdge || edge;
      })
    );
  }, [reactFlowInstance, id, data.otherProducesEdges]);

  return (
    <>
      {data.otherProducesEdges && data.otherProducesEdges.length > 0 ? (
        <>
          <BaseEdge
            id={id}
            path={edgePath}
            markerStart={data.isActive ? markerStart : undefined}
            style={{
              stroke: data.isActive ? '#2E7D32' : '#808080',
              strokeWidth: data.isActive ? '2px' : '1.5px',
              strokeDasharray: data.isActive ? '0px' : '20px'
            }}
          />
          <EdgeLabelRenderer>
            <StyledEdgeLabel labelX={labelX} labelY={labelY} backgroundColor={data.isActive ? '#2E7D32' : '#808080'}>
              {/* <button onClick={onEdgeClick}>
                                {data.label} {data.isActive.toString()}
                            </button> */}
              <ToggleButton
                value="check"
                selected={data.isActive}
                onChange={onEdgeClick}
                style={{ border: 'none', padding: 0 }}
              >
                {data.isActive ? <span>{data.label}</span> : <CloseIcon />}
              </ToggleButton>
            </StyledEdgeLabel>
          </EdgeLabelRenderer>
        </>
      ) : (
        <>
          <BaseEdge
            id={id}
            path={edgePath}
            markerStart={markerStart}
            style={{
              stroke: '#2E7D32',
              strokeWidth: '1.5px'
            }}
          />
          <EdgeLabelRenderer>
            <StyledEdgeLabel labelX={labelX} labelY={labelY} backgroundColor={'#2E7D32'}>
              <span>{data.label}</span>
            </StyledEdgeLabel>
          </EdgeLabelRenderer>
        </>
      )}
    </>
  );
};

export default ProducesEdge;
