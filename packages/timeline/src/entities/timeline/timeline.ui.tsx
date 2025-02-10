import React, { useState, useMemo, useEffect } from 'react';
import { setDate, useAppDispatch, useAppSelector } from '@org/store-redux';
import { getSeasonBlock, getTimeMarkers, getSeasonColor } from './timeline.utils';
import { type Direction, type TimelineProps, type TimelineSettings } from 'types';
import { TimelineControls } from '../timeline-controls';
import {
  TimelineItem,
  TimelineMarker,
  Tooltip,
  TimelineWrapper,
  TimelineContainer,
  SeasonBlock,
  TimelineLine,
  TimeMarker,
  TimeLabel
} from './timeline.styled';

// Timeline Component
export const Timeline = ({ dataTimeline, timelineSettings }: TimelineProps): React.ReactNode => {
  const dispatch = useAppDispatch();
  // New state for dragging
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const date = useAppSelector((state) => state.systemOperator.date);

  // // Function to handle item click
  // const onTimelineItemClick = (id) => {
  //   setSelectedItemId(id);
  // };

  // State to track the selected item index
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(dataTimeline.length - 1);

  // Move selection left or right
  const moveSelection = (direction: Direction): void => {
    setSelectedItemIndex((prevIndex) => {
      if (direction === 'left') {
        return Math.max(prevIndex - 1, 0);
      } else {
        return Math.min(prevIndex + 1, dataTimeline.length - 1);
      }
    });
  };

  // Настраиваем проигрывание перед запуском интервала
  const configureBeforePlay = (
    timelineSettings: TimelineSettings
  ): {
    direction: TimelineSettings['direction'];
    delay: TimelineSettings['timeIntervalStepPerSecond'];
  } => {
    const config: {
      direction: TimelineSettings['direction'];
      delay: TimelineSettings['timeIntervalStepPerSecond'];
    } = {
      direction: 'left',
      delay: timelineSettings.timeIntervalStepPerSecond
    };
    if (timelineSettings.startFrom === 'end') {
      setSelectedItemIndex(0);
      config.direction = 'right';
    }

    if (timelineSettings.startFrom === 'begin') {
      setSelectedItemIndex(dataTimeline.length - 1);
      config.direction = 'left';
    }

    return config;
  };

  useEffect(() => {
    let intervalTimeoutId: NodeJS.Timeout;
    if (timelineSettings !== undefined && timelineSettings.play) {
      const config = configureBeforePlay(timelineSettings);
      intervalTimeoutId = setInterval(() => {
        moveSelection(config.direction);
      }, config.delay * 1000);
    }

    return () => {
      clearInterval(intervalTimeoutId);
    };
  }, [timelineSettings]);

  // Mouse down event handler
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  // Mouse move event handler
  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2; // The speed of the drag, 2 can be adjusted
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  // Mouse up and leave event handler
  const onMouseUpOrLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsDragging(false);
  };

  const [zoomLevel, setZoomLevel] = useState<number>(10);

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    setZoomLevel((prevZoom) => Math.max(1, prevZoom + e.deltaY * -0.01));
  };

  const sortedTimelineData = [...dataTimeline].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const startDate = new Date(sortedTimelineData[0].start);

  const dateToPosition = (date: Date | string): number => {
    const currentDate = new Date(date);
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * zoomLevel;
  };

  const endDatePosition = dateToPosition(sortedTimelineData[sortedTimelineData.length - 1].start);

  // Generate season blocks
  const seasonBlocks = useMemo(getSeasonBlock(startDate, sortedTimelineData), [
    startDate,
    sortedTimelineData,
    zoomLevel
  ]);

  const timeMarkers = useMemo(getTimeMarkers(startDate, zoomLevel, sortedTimelineData), [
    startDate,
    sortedTimelineData,
    zoomLevel
  ]);

  // Function to handle item click
  const onTimelineItemClick = (index: number): void => {
    setSelectedItemIndex(index);
  };

  // Ensure the selected item is visible in the viewport
  const scrollToItem = (index: number): void => {
    const itemElement = document.getElementById(`timelineItem-${index}`);
    itemElement?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  };

  // Watch for changes in selectedItemIndex to scroll to the new selected item
  useEffect(() => {
    scrollToItem(selectedItemIndex);
    const selectedDate = sortedTimelineData[selectedItemIndex].start;
    dispatch(setDate({ date: selectedDate }));
  }, [selectedItemIndex]);

  useEffect(() => {
    const index = sortedTimelineData.findIndex((item) => item.start === date);
    if (index !== -1) {
      setSelectedItemIndex(index);
    }
    scrollToItem(selectedItemIndex);
  }, [dataTimeline]); // Dependency array includes data to react to changes

  const handleOnTimelineClick = (index: number) => () => {
    onTimelineItemClick(index);
  };

  const handleOnSideButtonClick = (direction: Direction) => () => {
    moveSelection(direction);
  };

  const timelineItems = sortedTimelineData.map((item, index) => (
    <TimelineItem
      key={item.id}
      id={`timelineItem-${index}`}
      style={{ left: `${dateToPosition(item.start)}px` }}
      onClick={handleOnTimelineClick(index)}
    >
      <TimelineMarker isSelected={Boolean(selectedItemIndex === index)} />
      <Tooltip className="tooltip">
        {item.start} - {item.content}
      </Tooltip>
    </TimelineItem>
  ));

  return (
    <TimelineWrapper>
      <TimelineControls onClick={handleOnSideButtonClick} />

      <TimelineContainer
        id="TimelineContainer"
        onWheel={handleWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
      >
        {seasonBlocks.map((block, index) => (
          <SeasonBlock
            key={index}
            color={getSeasonColor(block.start)}
            style={{
              left: `${dateToPosition(block.start)}px`,
              width: `${dateToPosition(block.end) - dateToPosition(block.start)}px`
            }}
          />
        ))}
        <TimelineLine style={{ width: `${endDatePosition}px` }} />
        {timelineItems}
        {timeMarkers.map((timeMarker, index) => (
          <React.Fragment key={index}>
            <TimeMarker
              style={{
                left: `${dateToPosition(timeMarker.toISOString().split('T')[0])}px`
              }}
            />
            <TimeLabel
              style={{
                left: `${dateToPosition(timeMarker.toISOString().split('T')[0])}px`
              }}
            >
              {timeMarker.toISOString().split('T')[0]}
            </TimeLabel>
          </React.Fragment>
        ))}
      </TimelineContainer>
    </TimelineWrapper>
  );
};
