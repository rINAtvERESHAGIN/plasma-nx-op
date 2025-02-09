import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import data from './trend-apex-chart-data.json';

const RangeAreaChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    // Преобразование options из JSON
    const parsedOptions = JSON.parse(JSON.stringify(data.options), (key, value) => {
      if (typeof value === 'string' && value.startsWith('function')) {
        return new Function(`return ${value}`)();
      }
      return value;
    });

    setChartData({
      series: data.series,
      options: {
        ...parsedOptions
      }
    });
  }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <Chart options={chartData.options} series={chartData.series} type="rangeArea" />
    </div>
  );
};

export default RangeAreaChart;
