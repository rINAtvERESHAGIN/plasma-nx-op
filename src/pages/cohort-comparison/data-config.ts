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

export const defaultDataSTLProcessor: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'MultiTrendProcessor',
    MixerName: 'MultiTrendNewGraphMixer',
    MixerMethodName: 'plot_trends_and_medians'
  }
};

export const defaultDataAgeValueInline: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'ClickAgeValueMultiProcessor',
    MixerName: 'MultiAgeValueGraphMixer',
    MixerMethodName: 'age_value_plots'
  }
};
