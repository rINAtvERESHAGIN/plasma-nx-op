import type { PlotData, PlotMouseEvent } from 'plotly.js';

type OnClickPlot = (event: Readonly<PlotMouseEvent>) => void;

export interface PlotlyRepresentationChartProps {
  plotData: PlotData;
  onClick?: OnClickPlot | undefined;
}
