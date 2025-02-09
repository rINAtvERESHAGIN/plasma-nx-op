export const createDatasetSpecification = (parameterId: number) => {
  const DEFAULT_DATA = {
    state: 'updated',
    data: {
      datasetSpecificationFormsData: [
        {
          ageRange: [10, 60],
          dateMin: '2015-01-01T00:00:00.000Z',
          dateMax: new Date(),
          humanSex: '0',
          parameters: [8],
          permission: 'week',
          selectedLab: 8,
          selectedParameter: '8',
          selectedRegion: [
            {
              id: 42,
              name_ru: 'Москва',
              iso_code: 'RU-MOW',
              district_name: 'Центральный ФО'
            }
          ]
        }
      ],
      processorSpecificationsData: [{}]
    }
  };

  return {
    STL: {
      ...DEFAULT_DATA,
      data: {
        ...DEFAULT_DATA.data,
        datasetSpecificationFormsData: DEFAULT_DATA.data.datasetSpecificationFormsData.map((dsf) => ({
          ...dsf,
          processor: 'STLProcessor',
          graphMixer: 'TrendGraphMixer',
          graphMixerFunction: 'plot_heatmap_stl'
        })),
        processorSpecificationsData: DEFAULT_DATA.data.processorSpecificationsData.map((psd) => ({
          ...psd,
          processor: 'STLProcessor',
          graphMixer: 'TrendGraphMixer',
          graphMixerFunction: 'plot_heatmap_stl'
        }))
      }
    },
    WeekMedianValue: {
      ...DEFAULT_DATA,
      data: {
        ...DEFAULT_DATA.data,
        datasetSpecificationFormsData: DEFAULT_DATA.data.datasetSpecificationFormsData.map((dsf) => ({
          ...dsf,
          processor: 'WeekMedianValueProcessor',
          graphMixer: 'WeekMedianValueGraphMixer',
          graphMixerFunction: 'plot_week_values_for_many_years'
        })),
        processorSpecificationsData: DEFAULT_DATA.data.processorSpecificationsData.map((psd) => ({
          ...psd,
          processor: 'WeekMedianValueProcessor',
          graphMixer: 'WeekMedianValueGraphMixer',
          graphMixerFunction: 'plot_week_values_for_many_years'
        }))
      }
    },
    AgeValue: {
      ...DEFAULT_DATA,
      data: {
        ...DEFAULT_DATA.data,
        datasetSpecificationFormsData: DEFAULT_DATA.data.datasetSpecificationFormsData.map((dsf) => ({
          ...dsf,
          processor: 'AgeValueProcessor',
          graphMixer: 'AgeValueGraphMixer',
          graphMixerFunction: 'plot_age_relationship_with_data_for_last_week_with_stat_testing'
        })),
        processorSpecificationsData: DEFAULT_DATA.data.processorSpecificationsData.map((psd) => ({
          ...psd,
          processor: 'AgeValueProcessor',
          graphMixer: 'AgeValueGraphMixer',
          graphMixerFunction: 'plot_age_relationship_with_data_for_last_week_with_stat_testing'
        }))
      }
    }
  };
};
