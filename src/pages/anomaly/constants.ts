import { type DataSpecification, type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';

export const baseData: DataSpecification = {
  parameter_ids: [27],
  date_min: '2015-01-01',
  date_max: new Date().toISOString().split('T')[0],
  lab_ids: [8],
  region_ids: [42],
  sex: 0,
  age_min: 10,
  age_max: 90
};

export const defaultDataSTL: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'STLProcessor',
    MixerName: 'TrendGraphMixer',
    MixerMethodName: 'plot_trend'
  }
};

export const defaultDataStatTest: ProcessorConfiguration = {
  data: [
    {
      ...baseData,
      date_min: '2020-01-01',
      date_max: '2024-05-23'
    }
  ],
  processorSpecification: {
    ProccesorName: 'StatTestProcessor',
    MixerName: 'StatTestGraphMixer',
    MixerMethodName: 'violin_plot_comparison'
  }
};
