import React, { useEffect } from 'react';
import { type WithConnectPlotProps } from '@shared/ui/plotly-interaction/with-diagram';
import { type PlotData } from '@shared/api/model/PlotData';


export const withResizable = <T extends WithConnectPlotProps>(
    WrappedComponent: React.ComponentType<T>
): React.FC<Omit<T, keyof WithConnectPlotProps>> => {
    const WithConnectPlotComponent: React.FC<Omit<T, keyof WithConnectPlotProps>> = (externalProps) => {
        const [plotData, setPlotData] = React.useState<PlotData | undefined>(undefined);

        useEffect(() => {
            setPlotData(externalProps.plotData);
        }, [externalProps.plotData]);

        if (plotData === undefined) return <h1>no data</h1>;

        // Передаем загруженные данные в WrappedComponent
        return <WrappedComponent plotData={plotData} onClick={handleOnClickPlot} {...externalProps} />;
    };

    return WithConnectPlotComponent;
};
