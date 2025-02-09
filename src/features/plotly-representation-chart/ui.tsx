import React, { useState, useEffect } from 'react';
import { type Layout, type Data } from 'plotly.js';
import { isNil, omit } from 'lodash';
import { StyledPlot } from './ui.styled';
import { type PlotlyRepresentationChartProps } from './types';

export const PlotlyRepresentationChart: React.FC<PlotlyRepresentationChartProps> = ({ plotData, onClick }) => {
  const [data, setData] = useState<Data[] | undefined>(undefined);
  const [layout, setLayout] = useState<Partial<Layout> | undefined>(undefined);

  useEffect(() => {
    if (!isNil(plotData)) {
      const plot = plotData[0].representation_data;

      // Удаление width и height
      const filteredLayout = omit(plot.layout, ['width', 'height']);

      const updatedLayout = {
        ...filteredLayout,
        paper_bgcolor: '#f3f5f6', // Цвет фона всего холста
        plot_bgcolor: '#f3f5f6', // Цвет фона области графика
        font: { family: 'Geologica' }, // Шрифт
        margin: {
          ...filteredLayout.margin,
          t: 10, // Отступ сверху
          l: 10, // Отступ слева
          r: 10, // Отступ справа
          b: 3 // Отступ снизу
        },
        // Убираем текст заголовка
        title: !isNil(filteredLayout.title) ? { ...filteredLayout.title, text: '' } : undefined,
        autosize: true
      };

      setLayout(updatedLayout);
      setData(plot.data);
    }
  }, [plotData]);

  const plotConfig = {
    displayModeBar: false, // Убирает панель инструментов
    responsive: true
  };

  if (isNil(data) || isNil(layout)) {
    return null;
  }

  return <StyledPlot data={data} layout={layout} onClick={onClick} useResizeHandler config={plotConfig} />;
};
