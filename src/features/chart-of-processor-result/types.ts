import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
import type { PlotMouseEvent, PlotData } from 'plotly.js';

export interface ChartOfProcessorResultProps {
  processorConfig: ProcessorConfiguration;
  onClickHandler?: (event: Readonly<PlotMouseEvent>) => void;
  preloadedPlot?: PlotData;
  onSavePlot?: (plot: PlotData) => void;
}
