import { type DataSpecification, type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';

export const baseData: DataSpecification = {
  parameter_ids: [27],
  date_min: '2015-01-01',
  date_max: new Date().toISOString().split('T')[0],
  lab_ids: [8],
  region_ids: [42],
  sex: -1,
  age_min: 10,
  age_max: 90
};

export const defaultDataTrend: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'STLProcessor',
    MixerName: 'TrendGraphMixer',
    MixerMethodName: 'plot_heatmap_stl'
  }
};

export const defaultDataAgeValue: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'ClickAgeValueInlineProcessor',
    MixerName: 'AgeValueGraphMixer',
    MixerMethodName: 'plot_age_relationship_with_data_for_last_week_with_stat_testing'
  }
};

export const defaultDataAgeSexPyramid: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'AgeSexPyramidProcessor',
    MixerName: 'AgeSexPyramidGraphMixer',
    MixerMethodName: 'male_female_contrast_plot'
  }
};

export const defaultDataSurface3d: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'STLProcessor',
    MixerName: 'TrendGraphMixer',
    MixerMethodName: 'surface_3d'
  }
};
