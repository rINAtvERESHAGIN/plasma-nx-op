import styled from '@emotion/styled';

export const RootMapContainer = styled.div`
  width: 100%;
  height: 50%;
  position: relative;
`;
export const MapContainer = styled.div`
  height: 100%; //если высота меньше 100% то будет видно знак Копирайта под картой
  width: 100%;
  overflow: hidden;
`;
export const FloatingButtonWithPopoverContainer = styled.div`
    position: absolute;
    left: 1px;
`;

