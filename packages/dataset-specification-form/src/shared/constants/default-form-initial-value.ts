export const DEFAULT_DATA = {
  ageRange: [15, 90],
  dateMin: new Date('2015-01-01'),
  dateMax: new Date(),
  humanSex: '2',
  parameters: [8],
  permission: 'week',
  selectedLab: 8,
  selectedRegion: [
    {
      district_name: 'Центральный ФО',
      id: 42,
      iso_code: 'RU-MOW',
      name_ru: 'Москва',
    },
  ],
  processor: 'STLProcessor',
  graphMixer: 'TrendGraphMixer',
  graphMixerFunction: 'plot_heatmap_stl',
};
