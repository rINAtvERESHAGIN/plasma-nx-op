import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useInView } from 'react-intersection-observer';

const chartOptions = {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 5000
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Динамика инекса SIRI и C-реактивного белка',
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    }
  },
  xaxis: {
    categories: ['2023-11-05', '2023-11-12', '2023-11-19', '2023-11-26', '2023-12-03', '2023-12-10', '2023-12-17', '2023-12-24', '2023-12-31', '2024-01-07', '2024-01-14', '2024-01-21', '2024-01-28', '2024-02-04', '2024-02-11', '2024-02-18', '2024-02-25', '2024-03-03', '2024-03-10', '2024-03-17', '2024-03-24']
  },
  yaxis: [
    {
      title: {
        text: "Индекс SIRI"
      },
      min: 0.9,
      labels: {
        formatter: function(val) {
          return val.toFixed(3);
        }
      }
    },
    {
      opposite: true,
      title: {
        text: "CRP"
      },
      min: 2.7,
      labels: {
        formatter: function(val) {
          return val.toFixed(3);
        }
      }
    }
  ]
};

const ApexChart = (): React.ReactNode => {
  const [chartSeries, setChartDotSeries] = useState([]);
  const { ref, inView } = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setChartDotSeries([
          {
            name: 'Индекс SIRI',
            data: [0.9030659181, 0.9037171875000001, 0.9065227385, 0.9076486265, 0.9066301288, 0.9097314723000001, 0.9159286717, 0.9193342749000001, 0.918636541, 0.9425659472000001, 0.9513996161, 0.9540979487000001, 0.9352613338, 0.9167960724, 0.9089788005, 0.9073619546, 0.905530531, 0.9063727944000001, 0.9057572646000001, 0.9055601945, 0.9005132685]
          },
          {
            name: 'CRP',
            data:[2.9335792304, 2.9219480402, 2.9383941354000003, 3.0108883247, 3.0257220595, 3.1125794501, 3.2406006575, 3.4019336756, 3.4760366184000002, 3.7124658689, 3.5578450257, 3.3066861279, 3.0945041694, 2.988932585, 2.9359542321000003, 2.8657594948, 2.9054277276000002, 2.9601478, 3.0089007892, 2.9569409679, 2.9221356371000002]
          }
        ]);
      }, 300);
    } else {
      setChartDotSeries([]);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <div
        id="chart"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
          padding: '10px 5px 10px 0',
          height: '65vh',
          width: '50vw'
        }}
      >
        <ReactApexChart options={chartOptions} series={chartSeries} type="line" height="100%" width="100%" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
