import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  type Node,
  type Edge,
  type OnConnect,
  useReactFlow,
  ReactFlowProvider,
  type ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';
import workFlow from './try-json/new-workflow.json';
import { getElementsFromTreeJson, layoutElements, nodeColor } from './utils';
import DragHandleNode from '../../entities/result-flow-drag-handle-node/ui';
import {
  FlowContainer,
  ProducesCountAlert,
  ProducesSpan,
  RequiresSpan,
  SelectedEdgeAlert,
  StyledFlow,
  StyledMiniMap
} from './ui.styled';
import { type LayoutDirection } from 'shared/api/model/resultFlow';
import { flowKey } from './constants';
import ContextMenu from '@entities/result-flow-context-menu/ui';
import ControlPanel from '@entities/result-flow-control-panel/ui';
import RequiresEdge from '@entities/result-flow-custom-edge/edge-types/requires-edge.ui';
import ProducesEdge from '@entities/result-flow-custom-edge/edge-types/produces-edge.ui';

const nodeTypes = {
  dragHandleNode: DragHandleNode
};

const edgeTypes = {
  PRODUCES: ProducesEdge,
  REQUIRES: RequiresEdge
  // custom: CustomEdge,
};

const ResultFlow: React.FunctionComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const { setViewport } = useReactFlow();

  const [showProducesCountAlert, setShowProducesCountAlert] = useState(false);
  const [producesEdgeCount, setProducesEdgeCount] = useState(0);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onNodeContextMenu = useCallback(
    (event, node: Node) => {
      event.preventDefault();

      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY - 97 < pane.height - 103 && event.clientY - 97,
        left: event.clientX - 97 < pane.width - 103 && event.clientX - 97,
        right: event.clientX - 97 >= pane.width - 103 && pane.width - event.clientX - 97,
        bottom: event.clientY - 97 >= pane.height - 103 && pane.height - event.clientY - 97
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => {
    setMenu(null);
  }, [setMenu]);

  // Клик на связь(Edge).
  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      // Получение всех рёбер для текущего узла
      const nodeEdges = edges.filter((e) => e.source === edge.source);

      // Подсчет количества активных рёбер типа 'PRODUCES'
      const activeProducesEdges = nodeEdges.filter((e) => e.data.type === 'PRODUCES' && e.data.isActive).length;

      const isActiveExplicitlyFalse = 'isActive' in edge.data && edge.data.isActive === false;

      if (
        (edge.data.type === 'PRODUCES' && edge.data.isActive === true && activeProducesEdges >= 2) ||
        isActiveExplicitlyFalse
      ) {
        setSelectedEdge(edge);
        setTimeout(() => {
          setSelectedEdge(null);
        }, 3000); // Скрываем Alert через 3 секунды
      }
    },
    [edges]
  );

  // Callback для сохранения текущего состояния диаграммы в localStorage.
  // Сериализует состояние диаграммы и сохраняет его под указанным ключом.
  const onSave = useCallback(() => {
    if (rfInstance !== null) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  // Callback для восстановления состояния диаграммы из localStorage.
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const storedFlow = localStorage.getItem(flowKey);

      if (storedFlow !== null) {
        const flow = JSON.parse(storedFlow);
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  // useEffect для загрузки и размещения начальных узлов и связей.
  useEffect(() => {
    const { nodes, edges } = getElementsFromTreeJson(workFlow);
    const layoutedNodes = layoutElements(nodes, edges, 'LR');
    setNodes(layoutedNodes);
    setEdges(edges);
  }, []);

  // Callback для обработки новых соединений между узлами.
  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  // Функция для применения вертикального расположения узлов и связей.
  const handleVerticalLayout = (): void => {
    onLayout('TB');
  };

  // Функция для применения горизонтального расположения узлов и связей.
  const handleHorizontalLayout = (): void => {
    onLayout('LR');
  };

  // Callback для перераспределения узлов и связей в зависимости от указанного направления ('TB' или 'LR').
  const onLayout = useCallback(
    (direction: LayoutDirection) => {
      const layoutedNodes = layoutElements(nodes, edges, direction);
      setNodes(layoutedNodes);
    },
    [nodes, edges]
  );

  useEffect(() => {
    const nodeProducesCounts = nodes.map((node) => ({
      node,
      count: edges.filter((edge) => edge.source === node.id && edge.data.type === 'PRODUCES' && edge.data.isActive)
        .length
    }));

    const nodesWithMultipleActiveProduces = nodeProducesCounts.filter((edge) => edge.count > 1).length;
    setProducesEdgeCount(nodesWithMultipleActiveProduces);
    setShowProducesCountAlert(nodesWithMultipleActiveProduces > 0);
  }, [nodes, edges]);

  return (
    <FlowContainer>
      <StyledFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setRfInstance}
        onPaneClick={onPaneClick}
        onEdgeClick={onEdgeClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView
      >
        <StyledMiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Controls></Controls>
        {showProducesCountAlert && (
          <ProducesCountAlert variant="outlined" severity="warning">
            Кол-во <ProducesSpan>узлов</ProducesSpan> принимающих несколько
            <RequiresSpan> связей</RequiresSpan> типа PRODUCES: {producesEdgeCount}
          </ProducesCountAlert>
        )}
        {selectedEdge !== null && (
          <SelectedEdgeAlert variant="outlined" severity="info">
            Выбрана связь между <RequiresSpan>{selectedEdge.source}</RequiresSpan> и
            <ProducesSpan> {selectedEdge.target}</ProducesSpan>
          </SelectedEdgeAlert>
        )}
        <Background />
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        <ControlPanel
          handleVerticalLayout={handleVerticalLayout}
          handleHorizontalLayout={handleHorizontalLayout}
          onSave={onSave}
          onRestore={onRestore}
        />
      </StyledFlow>
    </FlowContainer>
  );
};

export default () => (
  <ReactFlowProvider>
    <ResultFlow />
  </ReactFlowProvider>
);
