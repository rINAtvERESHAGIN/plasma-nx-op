import { type DatasetSpecificationChartProps, type OnClickPlot } from '@entities/dataset-specification-chart/ui';
import React, { useEffect } from 'react';
import { useUpdateXCoordinate, useXCoordinate } from '.';
import { type PlotData } from '@shared/api/model/PlotData';

// Определяем типы для входящих и исходящих пропсов HOC
export interface WithConnectPlotProps {
  plotData: PlotData;
}

type ExternalProps = DatasetSpecificationChartProps;

export function withConnectPlot<T extends WithConnectPlotProps>(
  WrappedComponent: React.ComponentType<T & DatasetSpecificationChartProps>
): React.FC<Omit<T, keyof WithConnectPlotProps> & ExternalProps> {
  const WithConnectPlotComponent: React.FC<Omit<T, keyof WithConnectPlotProps> & ExternalProps> = (externalProps) => {
    const [plotData, setPlotData] = React.useState<PlotData | undefined>(undefined);

    useEffect(() => {
      setPlotData(externalProps.plotData);
    }, [externalProps.plotData]);

    const updateXCoordinate = useUpdateXCoordinate();
    const xCoordinate = useXCoordinate();

    const handleOnClickPlot: OnClickPlot = (data) => {
      const xCoordinate = data.points[0].x;

      updateXCoordinate(xCoordinate);
    };

    if (plotData === undefined) return <h1>no data</h1>;

    // Передаем загруженные данные в WrappedComponent
    return <WrappedComponent plotData={plotData} onClick={handleOnClickPlot} {...externalProps} />;
  };

  return WithConnectPlotComponent;
}
