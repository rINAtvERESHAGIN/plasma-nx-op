import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
interface DataPoint {
  year: number
  count: number
}

interface Observation {
  lab: string
  count: number
  colors: string
}

interface ReviewChartState {
  patientsNumber: string
  observationsNumber: string
  dataPointsNumber: string
  dataPointsPerYear: DataPoint[]
  observationsPerLab: Observation[]
  ageSexPyramidCoverage: any
}
export const initialState: ReviewChartState = {
  patientsNumber: '42 882 520',
  observationsNumber: '97 260 597',
  dataPointsNumber: '1 126 143 945',
  dataPointsPerYear: [
    { year: 2018, count: 88552194 },
    { year: 2019, count: 138992957 },
    { year: 2020, count: 145497323 },
    { year: 2021, count: 199031475 },
    { year: 2022, count: 178031680 },
    { year: 2023, count: 134270732 }
  ],
  observationsPerLab: [
    {
      lab: 'CMD',
      count: 141934450,
      colors: '#F44336'
    },
    {
      lab: 'Инвитро',
      count: 603693613,
      colors: '#E91E63'
    },
    {
      lab: 'Литех',
      count: 1919363,
      colors: '#9C27B0'
    },
    {
      lab: 'KDL',
      count: 222452011,
      colors: '#7C27CA'
    },
    {
      lab: 'Гемотест',
      count: 158063871,
      colors: '#99B7B0'
    }
  ],
  ageSexPyramidCoverage: {
    data: [{
      hoverinfo: 'x',
      marker: { color: '#add8e6' },
      name: '\u041c\u0443\u0436\u0447\u0438\u043d\u044b - \u041d\u0430\u0441\u0435\u043b\u0435\u043d\u0438\u0435',
      orientation: 'h',
      x: [-37839, -138399, -339134, -895935, -842999, -2270093, -3294033, -4376974, -4194211, -4214049, -4821530, -5365719, -6200706, -6041744, -4099639, -3449682, -3795866, -4409099, -4945253, -3908871],
      y: ['95 \u2013 99', '90 \u2013 94', '85 \u2013 89', '80 \u2013 84', '75 \u2013 79', '70 \u2013 74', '65 \u2013 69', '60 \u2013 64', '55 \u2013 59', '50 \u2013 54', '45 \u2013 49', '40 \u2013 44', '35 \u2013 39', '30 \u2013 34', '25 \u2013 29', '20 \u2013 24', '15 \u2013 19', '10 \u2013 14', '5 \u2013 9', '0 \u2013 4'],
      type: 'bar'
    }, {
      hoverinfo: 'x',
      marker: { color: 'navy' },
      name: '\u041c\u0443\u0436\u0447\u0438\u043d\u044b - \u041f\u0430\u0446\u0438\u0435\u043d\u0442\u044b',
      opacity: 0.7,
      orientation: 'h',
      text: ['3.87%', '4.90%', '8.20%', '5.64%', '10.38%', '7.08%', '6.14%', '5.13%', '4.49%', '4.52%', '4.20%', '4.22%', '4.04%', '3.22%', '3.17%', '2.88%', '2.25%', '2.21%', '2.76%', '2.74%'],
      textposition: 'outside',
      x: [-1463, -6778, -27795, -50569, -87490, -160613, -202327, -224752, -188128, -190685, -202395, -226690, -250392, -194310, -129933, -99486, -85529, -97221, -136320, -107103],
      y: ['95 \u2013 99', '90 \u2013 94', '85 \u2013 89', '80 \u2013 84', '75 \u2013 79', '70 \u2013 74', '65 \u2013 69', '60 \u2013 64', '55 \u2013 59', '50 \u2013 54', '45 \u2013 49', '40 \u2013 44', '35 \u2013 39', '30 \u2013 34', '25 \u2013 29', '20 \u2013 24', '15 \u2013 19', '10 \u2013 14', '5 \u2013 9', '0 \u2013 4'],
      type: 'bar'
    }, {
      hoverinfo: 'x',
      marker: { color: 'pink' },
      name: '\u0416\u0435\u043d\u0449\u0438\u043d\u044b - \u041d\u0430\u0441\u0435\u043b\u0435\u043d\u0438\u0435',
      orientation: 'h',
      x: [103330, 448894, 1070992, 2573691, 1849812, 4184328, 5263518, 5943205, 5155225, 4761818, 5317318, 5655936, 6269412, 5878621, 3885152, 3323725, 3637446, 4188391, 4678954, 3688798],
      y: ['95 \u2013 99', '90 \u2013 94', '85 \u2013 89', '80 \u2013 84', '75 \u2013 79', '70 \u2013 74', '65 \u2013 69', '60 \u2013 64', '55 \u2013 59', '50 \u2013 54', '45 \u2013 49', '40 \u2013 44', '35 \u2013 39', '30 \u2013 34', '25 \u2013 29', '20 \u2013 24', '15 \u2013 19', '10 \u2013 14', '5 \u2013 9', '0 \u2013 4'],
      type: 'bar'
    }, {
      hoverinfo: 'x',
      marker: { color: 'purple' },
      name: '\u0416\u0435\u043d\u0449\u0438\u043d\u044b - \u041f\u0430\u0446\u0438\u0435\u043d\u0442\u044b',
      opacity: 0.7,
      orientation: 'h',
      text: ['3.21%', '3.33%', '5.40%', '4.02%', '7.74%', '6.22%', '6.15%', '6.07%', '6.05%', '7.30%', '7.51%', '8.20%', '9.09%', '8.35%', '8.95%', '6.96%', '3.40%', '2.27%', '2.58%', '2.43%'],
      textposition: 'outside',
      x: [3312, 14965, 57785, 103396, 143168, 260151, 323751, 360736, 311786, 347475, 399504, 464057, 569898, 491140, 347582, 231489, 123796, 95279, 120739, 89663],
      y: ['95 \u2013 99', '90 \u2013 94', '85 \u2013 89', '80 \u2013 84', '75 \u2013 79', '70 \u2013 74', '65 \u2013 69', '60 \u2013 64', '55 \u2013 59', '50 \u2013 54', '45 \u2013 49', '40 \u2013 44', '35 \u2013 39', '30 \u2013 34', '25 \u2013 29', '20 \u2013 24', '15 \u2013 19', '10 \u2013 14', '5 \u2013 9', '0 \u2013 4'],
      type: 'bar'
    }],
    layout: {
      bargap: 0.1,
      barmode: 'overlay',
      height: 800,
      title: { text: '\u041f\u0438\u0440\u0430\u043c\u0438\u0434\u0430 \u043d\u0430\u0441\u0435\u043b\u0435\u043d\u0438\u044f \u043f\u043e \u0432\u043e\u0437\u0440\u0430\u0441\u0442\u043d\u044b\u043c \u0433\u0440\u0443\u043f\u043f\u0430\u043c \u0438 \u043f\u043e\u043b\u0443' },
      xaxis: { title: { text: '\u041d\u0430\u0441\u0435\u043b\u0435\u043d\u0438\u0435' } },
      yaxis: {
        autorange: 'reversed',
        tickmode: 'array',
        ticktext: ['95 \u2013 99', '90 \u2013 94', '85 \u2013 89', '80 \u2013 84', '75 \u2013 79', '70 \u2013 74', '65 \u2013 69', '60 \u2013 64', '55 \u2013 59', '50 \u2013 54', '45 \u2013 49', '40 \u2013 44', '35 \u2013 39', '30 \u2013 34', '25 \u2013 29', '20 \u2013 24', '15 \u2013 19', '10 \u2013 14', '5 \u2013 9', '0 \u2013 4'],
        tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        title: { text: '\u0412\u043e\u0437\u0440\u0430\u0441\u0442\u043d\u0430\u044f \u0433\u0440\u0443\u043f\u043f\u0430' }
      },
      template: {
        data: {
          histogram2dcontour: [{
            type: 'histogram2dcontour',
            colorbar: { outlinewidth: 0, ticks: '' },
            colorscale: [[0.0, '#0d0887'], [0.1111111111111111, '#46039f'], [0.2222222222222222, '#7201a8'], [0.3333333333333333, '#9c179e'], [0.4444444444444444, '#bd3786'], [0.5555555555555556, '#d8576b'], [0.6666666666666666, '#ed7953'], [0.7777777777777778, '#fb9f3a'], [0.8888888888888888, '#fdca26'], [1.0, '#f0f921']]
          }],
          choropleth: [{ type: 'choropleth', colorbar: { outlinewidth: 0, ticks: '' } }],
          histogram2d: [{
            type: 'histogram2d',
            colorbar: { outlinewidth: 0, ticks: '' },
            colorscale: [[0.0, '#0d0887'], [0.1111111111111111, '#46039f'], [0.2222222222222222, '#7201a8'], [0.3333333333333333, '#9c179e'], [0.4444444444444444, '#bd3786'], [0.5555555555555556, '#d8576b'], [0.6666666666666666, '#ed7953'], [0.7777777777777778, '#fb9f3a'], [0.8888888888888888, '#fdca26'], [1.0, '#f0f921']]
          }],
          heatmap: [{
            type: 'heatmap',
            colorbar: { outlinewidth: 0, ticks: '' },
            colorscale: [[0.0, '#0d0887'], [0.1111111111111111, '#46039f'], [0.2222222222222222, '#7201a8'], [0.3333333333333333, '#9c179e'], [0.4444444444444444, '#bd3786'], [0.5555555555555556, '#d8576b'], [0.6666666666666666, '#ed7953'], [0.7777777777777778, '#fb9f3a'], [0.8888888888888888, '#fdca26'], [1.0, '#f0f921']]
          }],
          heatmapgl: [{
            type: 'heatmapgl',
            colorbar: { outlinewidth: 0, ticks: '' },
            colorscale: [[0.0, '#0d0887'], [0.1111111111111111, '#46039f'], [0.2222222222222222, '#7201a8'], [0.3333333333333333, '#9c179e'], [0.4444444444444444, '#bd3786'], [0.5555555555555556, '#d8576b'], [0.6666666666666666, '#ed7953'], [0.7777777777777778, '#fb9f3a'], [0.8888888888888888, '#fdca26'], [1.0, '#f0f921']]
          }],
          contourcarpet: [{ type: 'contourcarpet', colorbar: { outlinewidth: 0, ticks: '' } }],
          contour: [{
            type: 'contour',
            colorbar: { outlinewidth: 0, ticks: '' },
            colorscale: [[0.0, '#0d0887'], [0.1111111111111111, '#46039f'], [0.2222222222222222, '#7201a8'], [0.3333333333333333, '#9c179e'], [0.4444444444444444, '#bd3786'], [0.5555555555555556, '#d8576b'], [0.6666666666666666, '#ed7953'], [0.7777777777777778, '#fb9f3a'], [0.8888888888888888, '#fdca26'], [1.0, '#f0f921']]
          }],
          surface: [{
            type: 'surface',
            colorbar: { outlinewidth: 0, ticks: '' },
            colorscale: [[0.0, '#0d0887'], [0.1111111111111111, '#46039f'], [0.2222222222222222, '#7201a8'], [0.3333333333333333, '#9c179e'], [0.4444444444444444, '#bd3786'], [0.5555555555555556, '#d8576b'], [0.6666666666666666, '#ed7953'], [0.7777777777777778, '#fb9f3a'], [0.8888888888888888, '#fdca26'], [1.0, '#f0f921']]
          }],
          mesh3d: [{ type: 'mesh3d', colorbar: { outlinewidth: 0, ticks: '' } }],
          scatter: [{
            fillpattern: { fillmode: 'overlay', size: 10, solidity: 0.2 },
            type: 'scatter'
          }],
          parcoords: [{ type: 'parcoords', line: { colorbar: { outlinewidth: 0, ticks: '' } } }],
          scatterpolargl: [{
            type: 'scatterpolargl',
            marker: { colorbar: { outlinewidth: 0, ticks: '' } }
          }],
          bar: [{
            error_x: { color: '#2a3f5f' },
            error_y: { color: '#2a3f5f' },
            marker: {
              line: { color: '#E5ECF6', width: 0.5 },
              pattern: { fillmode: 'overlay', size: 10, solidity: 0.2 }
            },
            type: 'bar'
          }],
          scattergeo: [{
            type: 'scattergeo',
            marker: { colorbar: { outlinewidth: 0, ticks: '' } }
          }],
          scatterpolar: [{
            type: 'scatterpolar',
            marker: { colorbar: { outlinewidth: 0, ticks: '' } }
          }],
          histogram: [{
            marker: { pattern: { fillmode: 'overlay', size: 10, solidity: 0.2 } },
            type: 'histogram'
          }],
          scattergl: [{
            type: 'scattergl',
            marker: { colorbar: { outlinewidth: 0, ticks: '' } }
          }],
          scatter3d: [{
            type: 'scatter3d',
            line: { colorbar: { outlinewidth: 0, ticks: '' } },
            marker: { colorbar: { outlinewidth: 0, ticks: '' } }
          }],
          scattermapbox: [{
            type: 'scattermapbox',
            marker: { colorbar: { outlinewidth: 0, ticks: '' } }
          }],
          scatterternary: [{
            type: 'scatterternary',
            marker: { colorbar: { outlinewidth: 0, ticks: '' } }
          }],
          scattercarpet: [{
            type: 'scattercarpet',
            marker: { colorbar: { outlinewidth: 0, ticks: '' } }
          }],
          carpet: [{
            aaxis: {
              endlinecolor: '#2a3f5f',
              gridcolor: 'white',
              linecolor: 'white',
              minorgridcolor: 'white',
              startlinecolor: '#2a3f5f'
            },
            baxis: {
              endlinecolor: '#2a3f5f',
              gridcolor: 'white',
              linecolor: 'white',
              minorgridcolor: 'white',
              startlinecolor: '#2a3f5f'
            },
            type: 'carpet'
          }],
          table: [{
            cells: { fill: { color: '#EBF0F8' }, line: { color: 'white' } },
            header: { fill: { color: '#C8D4E3' }, line: { color: 'white' } },
            type: 'table'
          }],
          barpolar: [{
            marker: {
              line: { color: '#E5ECF6', width: 0.5 },
              pattern: { fillmode: 'overlay', size: 10, solidity: 0.2 }
            },
            type: 'barpolar'
          }],
          pie: [{ automargin: true, type: 'pie' }]
        },
        layout: {
          autotypenumbers: 'strict',
          colorway: ['#636efa', '#EF553B', '#00cc96', '#ab63fa', '#FFA15A', '#19d3f3', '#FF6692', '#B6E880', '#FF97FF', '#FECB52'],
          font: { color: '#2a3f5f' },
          hovermode: 'closest',
          hoverlabel: { align: 'left' },
          paper_bgcolor: 'white',
          plot_bgcolor: '#E5ECF6',
          polar: {
            bgcolor: '#E5ECF6',
            angularaxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
            radialaxis: { gridcolor: 'white', linecolor: 'white', ticks: '' }
          },
          ternary: {
            bgcolor: '#E5ECF6',
            aaxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
            baxis: { gridcolor: 'white', linecolor: 'white', ticks: '' },
            caxis: { gridcolor: 'white', linecolor: 'white', ticks: '' }
          },
          coloraxis: { colorbar: { outlinewidth: 0, ticks: '' } },
          colorscale: {
            sequential: [[0.0, '#0d0887'], [0.1111111111111111, '#46039f'], [0.2222222222222222, '#7201a8'], [0.3333333333333333, '#9c179e'], [0.4444444444444444, '#bd3786'], [0.5555555555555556, '#d8576b'], [0.6666666666666666, '#ed7953'], [0.7777777777777778, '#fb9f3a'], [0.8888888888888888, '#fdca26'], [1.0, '#f0f921']],
            sequentialminus: [[0.0, '#0d0887'], [0.1111111111111111, '#46039f'], [0.2222222222222222, '#7201a8'], [0.3333333333333333, '#9c179e'], [0.4444444444444444, '#bd3786'], [0.5555555555555556, '#d8576b'], [0.6666666666666666, '#ed7953'], [0.7777777777777778, '#fb9f3a'], [0.8888888888888888, '#fdca26'], [1.0, '#f0f921']],
            diverging: [[0, '#8e0152'], [0.1, '#c51b7d'], [0.2, '#de77ae'], [0.3, '#f1b6da'], [0.4, '#fde0ef'], [0.5, '#f7f7f7'], [0.6, '#e6f5d0'], [0.7, '#b8e186'], [0.8, '#7fbc41'], [0.9, '#4d9221'], [1, '#276419']]
          },
          xaxis: {
            gridcolor: 'white',
            linecolor: 'white',
            ticks: '',
            title: { standoff: 15 },
            zerolinecolor: 'white',
            automargin: true,
            zerolinewidth: 2
          },
          yaxis: {
            gridcolor: 'white',
            linecolor: 'white',
            ticks: '',
            title: { standoff: 15 },
            zerolinecolor: 'white',
            automargin: true,
            zerolinewidth: 2
          },
          scene: {
            xaxis: {
              backgroundcolor: '#E5ECF6',
              gridcolor: 'white',
              linecolor: 'white',
              showbackground: true,
              ticks: '',
              zerolinecolor: 'white',
              gridwidth: 2
            },
            yaxis: {
              backgroundcolor: '#E5ECF6',
              gridcolor: 'white',
              linecolor: 'white',
              showbackground: true,
              ticks: '',
              zerolinecolor: 'white',
              gridwidth: 2
            },
            zaxis: {
              backgroundcolor: '#E5ECF6',
              gridcolor: 'white',
              linecolor: 'white',
              showbackground: true,
              ticks: '',
              zerolinecolor: 'white',
              gridwidth: 2
            }
          },
          shapedefaults: { line: { color: '#2a3f5f' } },
          annotationdefaults: { arrowcolor: '#2a3f5f', arrowhead: 0, arrowwidth: 1 },
          geo: {
            bgcolor: 'white',
            landcolor: '#E5ECF6',
            subunitcolor: 'white',
            showland: true,
            showlakes: true,
            lakecolor: 'white'
          },
          title: { x: 0.05 },
          mapbox: { style: 'light' }
        }
      }
    }
  }
};

const reviewChartSlice = createSlice({
  name: 'reviewChart',
  initialState,
  reducers: {
    updateReviewChart: (state, { payload }: PayloadAction<ReviewChartState>) => ({
      ...state,
      ...payload
    })
  }
});

export const { updateReviewChart } = reviewChartSlice.actions;
export const reviewChartReducer = reviewChartSlice.reducer;
