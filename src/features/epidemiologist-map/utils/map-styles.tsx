import type { FillLayer, LineLayer, SymbolLayer } from 'react-map-gl';

export const dataLayer: FillLayer = {
  id: 'regions-fills',
  type: 'fill',
  source: 'regions',
  paint: {
    'fill-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      ['get', 'hoverFillColor'], // Цвет при наведении
      ['get', 'fillColor'] // Основной цвет
    ],
    'fill-opacity': 1
  }
};
export const borderLayer: LineLayer = {
  id: 'regions-borders',
  type: 'line',
  source: 'regions',
  paint: {
    'line-color': [
      'case',
      ['boolean', ['feature-state', 'selected'], false],
      '#E0F1F1', // Цвет при выборе
      '#414961' // Основной цвет
    ],
    'line-width': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      3,
      ['boolean', ['feature-state', 'selected'], false],
      2,
      1
    ]
  }
};

export const twoLayer: LineLayer = {
  id: 'two-borders',
  type: 'line',
  source: 'city',
  paint: {
    'line-color': '#414961',
    'line-width': 3
  }
};

export const markerLayer: SymbolLayer = {
  id: 'regions-marker',
  type: 'symbol',
  source: 'regions',
  layout: {
    'icon-image': ['case', ['==', ['get', 'status'], 'ok'], 'anomaly-area', 'transparent'],
    'icon-size': [
      'interpolate',
      ['linear'],
      ['zoom'],
      2,
      ['*', ['get', 'markerSize'], 0.2], // На уровне зума 2, размер иконки будет markerSize * 0.2
      2.5,
      ['*', ['get', 'markerSize'], 0.3],
      3,
      ['*', ['get', 'markerSize'], 0.4],
      3.5,
      ['*', ['get', 'markerSize'], 0.5],
      4,
      ['*', ['get', 'markerSize'], 0.6],
      4.5,
      ['*', ['get', 'markerSize'], 0.9],
      5,
      ['*', ['get', 'markerSize'], 1.0],
      5.5,
      ['*', ['get', 'markerSize'], 1.1],
      6,
      ['*', ['get', 'markerSize'], 1.2],
      6.5,
      ['*', ['get', 'markerSize'], 1.3],
      7,
      ['*', ['get', 'markerSize'], 1.5],
      8,
      ['*', ['get', 'markerSize'], 2.0],
      9,
      ['*', ['get', 'markerSize'], 2.5],
      10,
      ['*', ['get', 'markerSize'], 3.0]
    ],
    'icon-allow-overlap': true
  }
};
