import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
import type { PlotData, PlotMouseEvent } from 'plotly.js';

export interface RegionAgeProfileDeviationChartResultProps {
  processorConfig: ProcessorConfiguration;
  onClickHandler?: (event: Readonly<PlotMouseEvent>) => void;
  selectedCities: number[];
  preloadedPlot?: PlotData;
  onSavePlot?: (plot: PlotData) => void;
}
