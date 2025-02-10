import { type Timeline as TimelineType } from './Timeline';
import { type TimelineSettings } from './TimelineSettings';


export interface TimelineProps {
    dataTimeline: TimelineType[];
    timelineSettings?: TimelineSettings;
}
