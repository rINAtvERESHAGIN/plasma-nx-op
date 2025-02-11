import * as React from 'react';
import { Resizable, type ResizeCallback, type ResizeStartCallback } from 're-resizable';
import styled  from 'styled-components';
import { useState } from 'react';
import { enable } from './constats';

const styleRootResizableComponent = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent'
} as const;

// root
const StyledResizable = styled(Resizable)<{ isGrab: boolean }>`
    position: relative;
    padding-bottom: 32px;
    margin-bottom: 32px;
`;

const StyledHandle = styled.div<{ isGrab: boolean }>`
    height: 100%;
    width: 100%;

    background-color: transparent;
    cursor: ${(props) => (props.isGrab ? 'grabbing' : 'grab')};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    > :hover {
        height: 20px;
        width: 100%;
        background-color: #e0e0e0;
    }

    transition: 1s ease height;
`;

const DotsContainer = styled.div<{ isGrab: boolean }>`
    width: 30px;
    height: 6px;
    border-radius: 10px;
    cursor: ${(props) => (props.isGrab ? 'grabbing' : 'grab')};
    background-color: ${({ color }) => color};
    padding: 0 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3px;
`;

// Стилизованный компонент для каждой точки многоточия
const Dot = styled.div`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: black;
`;

const BottomBorderHandler = ({ isDragging }: { isDragging: boolean }) => {
  return (
    <StyledHandle id="styled-handle" isGrab={isDragging}>
      <DotsContainer isGrab={isDragging} color="#fff" onClick={() => {}}>
        <Dot />
        <Dot />
        <Dot />
      </DotsContainer>
    </StyledHandle>
  );
};

export interface ResizableDivProps {
    children: React.ReactNode;
    initialHeight: number;
    externalOnResizeStart: ResizeStartCallback;
    externalOnResizeStop: ResizeCallback;
    externalOnResize: ResizeCallback;
}

const ResizableDiv = ({
  children,
  initialHeight,
  externalOnResizeStart,
  externalOnResizeStop,
  externalOnResize
}: ResizableDivProps): React.ReactNode => {
  const [isDragging, setIsDragging] = useState(false);
  const [height, setHeight] = React.useState(200);

  React.useEffect(() => {
    if (initialHeight !== height) setHeight(initialHeight);
  }, [initialHeight]);

  const handleResizeStart: ResizeStartCallback = (e): void => {
    e.stopPropagation();
    setIsDragging(true);
    externalOnResizeStart();
  };

  const handleResizeStop: ResizeCallback = (e, direction, ref, d): void => {
    e.stopPropagation();
    const currentHeight = height + d.height;
    setHeight(currentHeight);
    externalOnResizeStop(e, direction, ref, d);
    setIsDragging(false);
  };

  const handleOnResize: ResizeCallback = (event, direction, elementRef, delta) => {
    externalOnResize(event, direction, elementRef, delta);
  };

  return (
    <StyledResizable
      size={{ width: '100%', height }}
      style={styleRootResizableComponent}
      enable={enable}
      isGrab={isDragging}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      onResize={handleOnResize}
      handleComponent={{
        bottom: <BottomBorderHandler isDragging={isDragging} />
      }}
      handleStyles={{
        bottom: {
          width: '100%',
          height: '20px'
        }
      }}
    >
      {children}
    </StyledResizable>
  );
};

export default ResizableDiv;
