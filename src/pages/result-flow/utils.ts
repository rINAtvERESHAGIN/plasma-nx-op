import Dagre from '@dagrejs/dagre';
import { type Node, type Edge, MarkerType } from 'reactflow';
import { type LayoutDirection } from '@shared/api/model/resultFlow';

// Функция для создания узлов и рёбер из JSON.
export const getElementsFromTreeJson = (node: Node[], parentNodeId = null, xPos = 0, yPos = 0, prefix = 'node') => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const yOffset = yPos;
  const refMap = {};
  const outgoingEdges = {};
  const incomingEdges = {};

  // Функция для обработки отдельного узла.
  const processNode = (currentNode, parentId, x, y, idPrefix) => {
    // const nodeId = `${idPrefix}-${currentNode.label || 'node'}`;
    const nodeId = currentNode.label;
    const { producers, inputs, ...nodeDataWithoutChildren } = currentNode;

    // Сохраняем ref_id, если он есть.
    if (currentNode.ref_id) {
      refMap[currentNode.ref_id] = nodeId;
    }

    // Создание нового узла.
    const newNode = {
      id: nodeId,
      type: 'dragHandleNode',
      dragHandle: '.custom-drag-handle',
      data: {
        label: currentNode.label,
        type: currentNode.type,
        ...nodeDataWithoutChildren
      },
      position: { x, y }
    };
    nodes.push(newNode);

    // Создание рёбер между узлами, если у текущего узла есть родитель.
    if (parentId) {
      const sourceNode = nodes.find((node) => node.id === parentId);
      const targetNode = newNode;
      const edge = {
        id: `e${parentId}-${nodeId}`,
        type: currentNode.type,
        source: parentId,
        target: nodeId,
        data: { label: currentNode.type, type: currentNode.type },
        markerEnd:
          sourceNode && sourceNode.data.type === 'PRODUCES'
            ? {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#1976D2'
              }
            : undefined,
        markerStart:
          targetNode.data.type === 'PRODUCES'
            ? {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#2E7D32'
              }
            : undefined
        // animated: true,
      };
      edges.push(edge);

      // Обновление списков исходящих и входящих рёбер
      outgoingEdges[parentId] = outgoingEdges[parentId] || [];
      outgoingEdges[parentId].push(edge);

      incomingEdges[nodeId] = incomingEdges[nodeId] || [];
      incomingEdges[nodeId].push(edge);
    }

    let localYOffset = y;

    // Обрабатываем вложенные inputs, если они есть
    if (inputs) {
      inputs.forEach((input, idx) => {
        // Проверяем, является ли input прямой ссылкой (ref_id)
        if (typeof input === 'string' && refMap[input]) {
          const targetId = refMap[input];
          const refEdge = {
            id: `e${nodeId}-${targetId}`,
            type: 'REQUIRES',
            source: nodeId,
            target: targetId,
            data: { label: 'REQUIRES', type: 'REQUIRES' }, //поменять
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: 'red'
            }
            // animated: true,
          };
          edges.push(refEdge);
        } else {
          // Создание новых вложенных узлов для каждого input
          localYOffset += 150;
          processNode(
            { ...input, label: input.input, type: 'REQUIRES' },
            nodeId,
            x + 250,
            localYOffset,
            `${nodeId}-input-${idx}`
          );
        }
      });
    }

    // Обрабатываем вложенные producers, если они есть
    if (producers) {
      producers.forEach((producer, idx) => {
        Object.entries(producer).forEach(([prodName, prodData]) => {
          localYOffset += 150;
          processNode(
            { ...prodData, label: prodName, type: 'PRODUCES' },
            nodeId,
            x + 250,
            localYOffset,
            `${nodeId}-prod-${idx}`
          );
        });
      });
    }
  };

  if (node && node.structured_representation) {
    processNode(
      {
        ...node.structured_representation,
        label: node.structured_representation.input,
        type: 'REQUIRES'
      },
      null,
      xPos,
      yOffset,
      prefix
    );
  }

  // Перебор всех узлов для проверки наличия у каждого из них входящих и исходящих рёбер типа 'PRODUCES'.
  // Если у узла нет ни входящих, ни исходящих рёбер этого типа, его тип данных изменяется на 'Simple'.
  nodes.forEach((node) => {
    const hasProducesOutgoing = (outgoingEdges[node.id] || []).some((edge) => edge.data.type === 'PRODUCES');
    const hasProducesIncoming = (incomingEdges[node.id] || []).some((edge) => edge.data.type === 'PRODUCES');
    if (!hasProducesOutgoing && !hasProducesIncoming) {
      node.data.type = 'Simple';
    }
  });

  nodes.forEach((node) => {
    const producesEdges = outgoingEdges[node.id]
      ? outgoingEdges[node.id].filter((edge) => edge.data.type === 'PRODUCES')
      : [];

    if (producesEdges.length > 1) {
      producesEdges.forEach((currentEdge) => {
        const otherProducesEdgesIds = producesEdges.filter((edge) => edge.id !== currentEdge.id).map((edge) => edge.id);

        const edgeIndex = edges.findIndex((edge) => edge.id === currentEdge.id);
        if (edgeIndex !== -1) {
          edges[edgeIndex].data.otherProducesEdges = otherProducesEdgesIds;
          edges[edgeIndex].data.isActive = true;
        }
      });
    }
  });

  return { nodes, edges };
};

// Функция для автоматической укладки узлов с использованием Dagre.
export const layoutElements = (nodes: Node[], edges: Edge[], direction: LayoutDirection): Node[] => {
  const dagreGraph = new Dagre.graphlib.Graph();
  dagreGraph.setGraph({ rankdir: direction });
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 400, height: 500 });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  Dagre.layout(dagreGraph);

  return nodes.map((node) => ({
    ...node,
    position: { x: dagreGraph.node(node.id).x - 50, y: dagreGraph.node(node.id).y - 25 }
  }));
};
// Функция для определения цвета узла на миникарте.
export const nodeColor = (node: Node): string => {
  switch (node.data.type) {
    case 'PRODUCES':
      return '#2E7D32';
    case 'REQUIRES':
      return '#1976D2';
    default:
      return 'grey';
  }
};
