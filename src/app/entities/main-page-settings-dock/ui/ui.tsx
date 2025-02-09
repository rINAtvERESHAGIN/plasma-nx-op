import * as React from 'react';
import { useSpringValue } from '@react-spring/web';
import { clamp } from '@react-spring/shared';
import { useWindowResize } from '../../../shared/api/hooks/use-window-resize';
import { DockContext } from '../dock-context';
import { DockContainer } from './ui.styled';

interface DockProps {
  children: React.ReactNode;
}

export const DOCK_ZOOM_LIMIT = [-100, 50];

export const Dock = ({ children }: DockProps) => {
  const [hovered, setHovered] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const isZooming = React.useRef(false);
  const dockRef = React.useRef<HTMLDivElement>(null!);

  const setIsZooming = React.useCallback((value: boolean) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  const zoomLevel = useSpringValue(1, {
    onChange: () => {
      setWidth(dockRef.current.clientWidth);
    }
  });

  useWindowResize(() => {
    setWidth(dockRef.current.clientWidth);
  });

  const onMouseOver = () => {
    if (!isZooming.current) {
      setHovered(true);
    }
  };

  const onMouseOut = () => {
    setHovered(false);
  };

  return (
    <DockContext.Provider value={{ hovered, setIsZooming, width, zoomLevel }}>
      <DockContainer
        ref={dockRef}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        style={{
          x: '-50%',
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5]
            })
            .to(value => clamp(0.5, 2, value))
        }}
      >
        {children}
      </DockContainer>
    </DockContext.Provider>
  );
};
