import { monthGradients } from '@org/constants-plasma';
import { IntRange, type Timeline as TimelineType } from 'types';


export const getSeasonColor = (date: Date): string => {
  const month = date.getMonth() as IntRange<0, 12>;
  return monthGradients[month];
};
export const getTimeMarkers = (startDate: Date, zoomLevel: number, sortedData: TimelineType[]) => (): Date[] => {
  const markers = [];
  let currentDate = new Date(startDate);

  if (zoomLevel > 12) {
    // Weekly markers
    while (currentDate <= new Date(sortedData[sortedData.length - 1].start)) {
      markers.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
  } else if (zoomLevel > 7) {
    // Monthly markers
    currentDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
    while (currentDate <= new Date(sortedData[sortedData.length - 1].start)) {
      markers.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  } else if (zoomLevel > 5) {
    // Seasonal markers (every three months)
    currentDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 1);
    while (currentDate <= new Date(sortedData[sortedData.length - 1].start)) {
      markers.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 3);
    }
  } else {
    // Yearly markers
    currentDate = new Date(startDate.getFullYear() + 1, 0, 1);
    while (currentDate <= new Date(sortedData[sortedData.length - 1].start)) {
      markers.push(new Date(currentDate));
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
  }

  return markers;
};
export const getSeasonBlock = (startDate: Date, sortedTimelineData: TimelineType[]) => () => {
  const blocks = [];
  let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  while (currentDate <= new Date(sortedTimelineData[sortedTimelineData.length - 1].start)) {
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    blocks.push({
      start: new Date(currentDate),
      end: new Date(nextDate),
      color: getSeasonColor(currentDate)
    });
    currentDate = nextDate;
  }
  return blocks;
};
