import React, { useState } from 'react';
import { Container, TimelineContainer } from './timeline-tools.styled';
import { TimelineProps, TimelineSettings } from 'types';
import TimelinePlayer from '../../entities/timeline-player/timeline-player.ui';
import { Timeline } from '../../entities';

export const TimelineTools = ({ dataTimeline }: TimelineProps): React.ReactNode => {
  const [timelineSettings, setTimelineSettings] = useState<TimelineSettings>({
    timeIntervalStepPerSecond: 1,
    direction: 'left',
    play: false,
    startFrom: 'begin'
  });

  return (
    <Container>
      <TimelinePlayer setTimelineSetting={setTimelineSettings} />
      <TimelineContainer>
        <Timeline dataTimeline={dataTimeline} timelineSettings={timelineSettings} />
      </TimelineContainer>
    </Container>
  );
};
