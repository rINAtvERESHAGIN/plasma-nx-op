import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ControlButton } from './timeline-controls.styled';
import { type Direction } from 'types';

type TimelineControlsOnClick = (direction: Direction) => () => void;
export const TimelineControls = ({ onClick }: { onClick: TimelineControlsOnClick }): React.ReactNode => (
  <>
    <ControlButton aria-label="Scroll Left" onClick={onClick('left')} style={{ left: 10 }}>
      <ArrowBackIosIcon />
    </ControlButton>
    <ControlButton aria-label="Scroll Right" onClick={onClick('right')} style={{ right: 10 }}>
      <ArrowForwardIosIcon />
    </ControlButton>
  </>
);
