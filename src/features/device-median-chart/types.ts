import type { PlotMouseEvent, LegendClickEvent, PlotData } from 'plotly.js';
import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';

export type OnClickPlot = (event: Readonly<PlotMouseEvent>) => void;

export type OnButtonClicked = (event: { active: number }) => void;

export interface PlotlyRepresentationChartProps {
  plotData: PlotData | undefined;
  onClick?: OnClickPlot;
  onButtonClicked: (activeIndex: number) => void;
  onLegendClick?: (event: LegendClickEvent) => void;
}

export interface DeviceMedianProcessorResultProps {
  processorConfig: ProcessorConfiguration;
  onClickHandler?: (event: Readonly<PlotMouseEvent>) => void;
  preloadedPlot?: PlotData;
  onSavePlot?: (plot: PlotData) => void;
  selectedDevices: string[];
  onActiveMenuIndexChange?: () => void;
  setSelectedDevices: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface TraceVisibilityProps {
  trace: PlotData;
  activeMenuIndex: number | null;
  selectedDevices: string[];
}
