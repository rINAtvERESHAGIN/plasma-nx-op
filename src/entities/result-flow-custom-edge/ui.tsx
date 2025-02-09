import React, { useCallback, type FC } from 'react';
import { type EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge, useStore, useReactFlow } from 'reactflow';
import { getEdgeParams } from './ui/utils';
import { StyledEdgeLabel } from './ui/ui.styled';

const typeToColorMap = {
    PRODUCES: '#2E7D32',
    REQUIRES: '#1976D2'
};

const CustomEdge: FC<EdgeProps> = ({ id, source, target, data, markerStart, markerEnd }) => {
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

    const backgroundColor = typeToColorMap[data.type] || 'grey';

    const reactFlowInstance = useReactFlow();

    const onEdgeClick = useCallback(() => {
        const allEdges = reactFlowInstance.getEdges();
    }, [reactFlowInstance]);

    const onDeleteSpecificEdge = useCallback(() => {
        reactFlowInstance.setEdges((prevEdges) =>
            prevEdges.filter((edge) => edge.id !== 'enode-Phyloseq-node-Phyloseq-prod-0-kraken2-create-phyloseq')
        );
    }, [reactFlowInstance]);

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerStart={markerStart}
                markerEnd={markerEnd}
                style={{
                    stroke: typeToColorMap[data.type],
                    strokeWidth: '1.5px'
                }}
            />
            <EdgeLabelRenderer>
                <StyledEdgeLabel labelX={labelX} labelY={labelY} backgroundColor={backgroundColor}>
                    <button onClick={onEdgeClick}> {data.label}</button>
                </StyledEdgeLabel>
            </EdgeLabelRenderer>
        </>
    );
};

export default CustomEdge;
