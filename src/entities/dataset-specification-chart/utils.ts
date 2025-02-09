import { CHART_HEIGHTS } from './constants';
import { type ChartId } from '@shared/api/model/ChartId';

type ChartHeights = {
    [key in ChartId]: number;
};

/* Функция для получения сохраненных высот всех графиков */
const getParsedChartHeights = (): ChartHeights => {
  const heights = localStorage.getItem(CHART_HEIGHTS);
  return heights ? JSON.parse(heights) : {};
};

/* Функция для сохранения высот всех графиков */
const saveChartHeights = (heights: ChartHeights): void => {
  localStorage.setItem(CHART_HEIGHTS, JSON.stringify(heights));
};

/* Функция для установки новой высоты для графика в localStorage */
export const setChartHeight = (chartId: ChartId, height: number): void => {
  if (chartId !== '') {
    const parsedHeights = getParsedChartHeights();
    parsedHeights[chartId] = height;
    saveChartHeights(parsedHeights);
  }
};

/* Функция для получения высоты графика из localStorage */
export const getChartHeight = (chartId: ChartId): number => {
  const parsedHeights = getParsedChartHeights();
  return parsedHeights[chartId];
};
