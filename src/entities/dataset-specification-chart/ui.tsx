import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { type PlotMouseEvent } from 'plotly.js';
import { useXCoordinate } from '@shared/ui/plotly-interaction/reducer';
import { type PlotData } from './@types/PlotData';
import ResizableDiv from '@features/resize-block/ui';
import { Fade } from '@mui/material';
import { PlotContainer, PlotShadow, PlotWrapper } from './ui.styled';
import { setChartHeight, getChartHeight } from './utils';
import { type ChartId } from '@shared/api/model/ChartId';
import { isNil } from 'lodash';

export type OnClickPlot = (event: Readonly<PlotMouseEvent>) => void;

export interface DatasetSpecificationChartProps {
  plotData?: PlotData;
  fullParentHeight?: boolean;
  onClick?: OnClickPlot | undefined;
  chartId?: ChartId;
}

const updatedLayoutWithHeight = (layout: Plotly.Layout, height: number): Plotly.Layout => {
  const newLayout = JSON.parse(JSON.stringify(layout));
  newLayout.height = height;
  return newLayout;
};

const DatasetSpecificationChart = ({
  plotData,
  fullParentHeight,
  onClick,
  chartId
}: DatasetSpecificationChartProps): React.ReactNode => {
  const xCoordinate = useXCoordinate();
  const [data, setData] = useState(undefined);
  const [layout, setLayout] = useState(undefined);

  /* Обращая высота для графика и контейнера изменения высоты */
  const [height, setHeight] = useState<number>(() => getChartHeight(chartId));

  const getNewShape = (xCoordinate) => {
    return {
      id: 'timeCursor', // Уникальный идентификатор для временного курсора
      type: 'line',
      x0: xCoordinate,
      x1: xCoordinate,
      y0: 0,
      y1: 1,
      xref: 'x',
      yref: 'paper',
      line: {
        color: 'black',
        width: 3,
        dash: 'dash'
      }
    };
  };

  const isXCoordinateInRange = (xCoordinate, data) => {
    const xValues = data
      .map((d) => d.x)
      .flat()
      .map((dateStr) => new Date(dateStr));
    const minX = new Date(Math.min(...xValues));
    const maxX = new Date(Math.max(...xValues));
    const xCoordDate = new Date(xCoordinate);

    return xCoordDate >= minX && xCoordDate <= maxX;
  };

  useEffect(() => {
    if (!isNil(data) && !isNil(layout) && !isNil(xCoordinate) && !isNil(chartId)) {
      const existingShapes = layout.shapes || [];

      // Удаляем старый временной курсор, если он был добавлен
      const filteredShapes = existingShapes.filter((shape) => shape.id !== 'timeCursor');

      let updatedShapes = filteredShapes;

      if (chartId === 'wordstat-plotly') {
        // Создаём временной курсор, если xCoordinate в диапазоне
        if (isXCoordinateInRange(xCoordinate, data)) {
          const newShape = getNewShape(xCoordinate);
          updatedShapes = [...filteredShapes, newShape];
        }
      } else {
        const newShape = getNewShape(xCoordinate);
        updatedShapes = [...filteredShapes, newShape];
      }

      const updatedLayout = {
        ...layout,
        width: 0,
        height: fullParentHeight,
        ...(xCoordinate !== null && {
          shapes: updatedShapes
        })
      };
      setLayout(updatedLayout);
    }
  }, [xCoordinate]);

  /* Раздельная установка данных графика и его расположения */
  useEffect(() => {
    if (plotData !== undefined) {
      const updatedlLayout = { ...plotData.layout };
      updatedlLayout.width = 0;

      const existingShapes = updatedlLayout.shapes || [];
      let updatedShapes = existingShapes.filter((shape) => shape.id !== 'timeCursor');

      if (chartId === 'wordstat-plotly') {
        // Добавляем временной курсор, если xCoordinate в диапазоне
        if (xCoordinate !== null && isXCoordinateInRange(xCoordinate, plotData.data)) {
          const newShape = getNewShape(xCoordinate);
          updatedShapes = [...updatedShapes, newShape];
        }
      } else {
        if (!isNil(xCoordinate) && !isNil(chartId)) {
          const newShape = getNewShape(xCoordinate);
          updatedShapes = [...updatedShapes, newShape];
        }
      }

      updatedlLayout.shapes = updatedShapes;

      setLayout(updatedlLayout);
      setData(plotData.data);
      setHeight(height || updatedlLayout.height || 500);
    }
  }, [plotData]);

  /* Флаг для переключения с графика на его теневой элемент */
  const [isResizing, setIsResizing] = useState(false);

  /* Внешний обработчик начала изменения высоты для 
    вызова отображения теневого элемента графика */
  const handleOnResizeStart = (): void => {
    setIsResizing(true);
  };

  /* Внешний обработнич остановки изменения высоты для установки высоты графика */
  const handleOnResizeStop = (e, direction, ref, d): void => {
    setIsResizing(false);
    const currentHeight = height + d.height;
    setHeight(currentHeight);
    setChartHeight(chartId, currentHeight);
  };

  /* Высота для теневого элемента графика */
  const [onResizingHeight, setOnResizingHeight] = useState(height);

  /* Используется для динамического изменения высоты теневого элемента графика */
  const handleOnResizing = (e, direction, ref, d): void => {
    const currentHeight = height + d.height;
    setOnResizingHeight(currentHeight);
  };

  /** Устанавливает высоту для теневого элемента графика
   * т.к. нельзя получить сам элемень Plot в DOM
   * была создана обертка, получая её, мы можем получить
   * её детей, берем первого ребенка и вытаскиваем его высоту
   */
  useEffect(() => {
    if (data !== undefined && layout !== undefined) {
      const plot = document.querySelector('#plot')?.children[0];
      if (plot !== undefined) setOnResizingHeight(plot.clientHeight);
    }
  }, [data, layout]);

  return (
    <ResizableDiv
      initialHeight={height}
      externalOnResizeStart={handleOnResizeStart}
      externalOnResizeStop={handleOnResizeStop}
      externalOnResize={handleOnResizing}
    >
      {data !== undefined && layout !== undefined ? (
        <PlotContainer>
          {isResizing ? (
            <Fade in={isResizing}>
              <PlotShadow onResizingHeight={onResizingHeight} />
            </Fade>
          ) : (
            <PlotWrapper id="plot">
              <Plot
                data={data}
                layout={updatedLayoutWithHeight(layout, height)}
                useResizeHandler
                style={{ width: '100%' }}
                onClick={onClick}
              />
            </PlotWrapper>
          )}
        </PlotContainer>
      ) : null}
    </ResizableDiv>
  );
};

DatasetSpecificationChart.defaultProps = {
  plotData: null
};

export default DatasetSpecificationChart;
