import { type DataSpecification, type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';

export const baseData: DataSpecification = {
  parameter_ids: [1, 3, 9, 10, 11, 12, 13, 16, 17, 33, 20, 21, 22, 24, 25, 27, 37, 48, 56],
  date_min: '2023-10-06',
  date_max: new Date().toISOString().split('T')[0],
  lab_ids: [8],
  region_ids: [42],
  sex: -1,
  age_min: 0,
  age_max: 100
};

export const defaultDataUnrecognizedProfile: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'ClickProfileProcessor',
    MixerName: 'ProfileGraphMixer',
    MixerMethodName: 'plot_trend_of_unrecognized_profile'
  }
};

export const defaultDataDiseasesProfile: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'ClickProfileProcessor',
    MixerName: 'ProfileGraphMixer',
    MixerMethodName: 'plot_barchart_of_diseases'
  }
};

export const defaultDataWeekDiseasesProfile: ProcessorConfiguration = {
  data: [
    {
      ...baseData,
      date_min: '2024-09-30',
      date_max: '2024-10-06'
    }
  ],
  processorSpecification: {
    ProccesorName: 'ClickProfileProcessor',
    MixerName: 'ProfileGraphMixer',
    MixerMethodName: 'plot_barchart_of_diseases'
  }
};
