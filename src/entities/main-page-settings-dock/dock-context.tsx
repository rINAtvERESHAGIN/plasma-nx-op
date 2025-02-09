import { createContext, useContext } from 'react';
import { type SpringValue } from '@react-spring/web';

interface DockApi {
  hovered: boolean
  width: number
  zoomLevel?: SpringValue
  setIsZooming: (isZooming: boolean) => void
}

export const DockContext = createContext<DockApi>({ width: 0, hovered: false, setIsZooming: () => {} });

export const useDock = () => {
  return useContext(DockContext);
};
