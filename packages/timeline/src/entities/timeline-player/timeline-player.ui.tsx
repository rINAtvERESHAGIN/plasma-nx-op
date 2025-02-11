import React, { useState } from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Slider,
  Tooltip,
} from '@mui/material';
import {useLongPress} from '../../shared/api/hooks/useLongPress';
import { debounce } from 'lodash';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { type TimelineSettings } from 'types';
import { Container, HorizontalCollapse, PlayerContainer } from './timeline-player.styled';
import { type IntRange } from 'types';

interface IProps {
  setTimelineSetting: React.Dispatch<React.SetStateAction<TimelineSettings>>;
}

const TimelinePlayer = ({ setTimelineSetting }: IProps): React.ReactNode => {
  // флаг воспроизведения
  const [isPlay, setPlay] = useState<boolean>(false);
  // флаг показать настройки проигрывателя
  const [showMoreSettings, setShowMoreSettings] = useState<boolean>(false);
  //
  const [startFrom, setStartFrom] =
    useState<TimelineSettings['startFrom']>('begin');
  // сервис изменения значения настроек проигрывателя timeline
  const serviceSetterTimelinePlayer = (
    value: Partial<TimelineSettings>,
  ): void => {
    setTimelineSetting((prev) => ({ ...prev, ...value }));
  };
  // остановка проигрывателя
  const handleClickPause = (): void => {
    setPlay(!isPlay);
    serviceSetterTimelinePlayer({ play: !isPlay });
  };
  // включить проигрывание
  const handleClickPlay = (): void => {
    setPlay(!isPlay);
    setShowMoreSettings(false);
    serviceSetterTimelinePlayer({ play: !isPlay });
  };
  // обработчик долгово нажатия
  const handleOnPressHold = (): void => {
    setShowMoreSettings(true);
  };
  // долгое удерживаине
  const defaultOptions: {
    shouldPreventDefault?: boolean | undefined;
    delay?: number | undefined;
  } = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(
    handleOnPressHold,
    handleClickPlay,
    defaultOptions,
  );
  // отложенное действие на изменения переключения тиков в секундах
  const changeTimeIntervalPerSecond = debounce(
    (_: Event, newValue: number | number[]) => {
      if (typeof newValue === 'number')
        serviceSetterTimelinePlayer({
          timeIntervalStepPerSecond: newValue as IntRange<0, 11>,
        });
    },
    500,
  );
  // отложенное действие переключение начало/конец
  const switchBeginFrom = debounce(() => {
    const newValue = startFrom === 'begin' ? 'end' : 'begin';
    setStartFrom(newValue);
    serviceSetterTimelinePlayer({ startFrom: newValue });
  }, 500);

  return (
    <Container>
      {isPlay ? (
        <IconButton
          aria-label="play/delete-icon"
          size="large"
          onClick={handleClickPause}
        >
          <PauseIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="play/delete-icon"
          size="large"
          {...longPressEvent}
        >
          <Tooltip
            title="Удерживайте для настроек проигрывателя"
            placement="top"
          >
            <PlayArrowIcon />
          </Tooltip>
        </IconButton>
      )}

      <Box sx={{ width: '100%' }}>
        <HorizontalCollapse
          sx={{ width: '100%' }}
          orientation="horizontal"
          in={showMoreSettings}
        >
          <PlayerContainer id="PlayerSetting">
            <Slider
              sx={{ width: '50%' }}
              marks
              step={1}
              defaultValue={1}
              min={1}
              max={10}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={changeTimeIntervalPerSecond}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Button
              startIcon={startFrom === 'begin' ? <EastIcon /> : <WestIcon />}
              onClick={switchBeginFrom}
            >
              {startFrom === 'begin' ? 'Начало' : 'Конца'}
            </Button>

            <Button>Сбросить</Button>
          </PlayerContainer>
        </HorizontalCollapse>
      </Box>
    </Container>
  );
};

export default TimelinePlayer;
