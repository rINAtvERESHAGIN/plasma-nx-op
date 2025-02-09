import React from 'react';
import { isNil } from 'lodash';
import { TooltipContainer } from './ui.styled';
import { type MapTooltipProps } from './type';

export const MapTooltip: React.FunctionComponent<MapTooltipProps> = ({ hoverInfo }) => {
  if (!isNil(hoverInfo)) {
    return (
      <TooltipContainer left={hoverInfo.x} top={hoverInfo.y - 30}>
        {hoverInfo.feature.properties.name}
      </TooltipContainer>
    );
  }

  return null;
};
