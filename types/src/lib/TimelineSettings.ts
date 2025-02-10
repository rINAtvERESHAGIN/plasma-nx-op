import { type IntRange } from 'shared/constants/month-gradients';
import { type Direction } from './Direction';

export interface TimelineSettings {
  timeIntervalStepPerSecond: IntRange<0, 11>;
  direction: Direction;
  play: boolean;
  startFrom: 'begin' | 'end';
}
