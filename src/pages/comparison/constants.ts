import { type DataSpecification, type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';

export const baseData: DataSpecification = {
  parameter_ids: [27],
  date_min: '2020-10-06',
  date_max: new Date().toISOString().split('T')[0],
  lab_ids: [8],
  region_ids: [],
  sex: -1,
  age_min: 0,
  age_max: 100
};

export const defaultDataRegionAgeProfileDeviation: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'RegionAgeProfileDeviationProcessor',
    MixerName: 'RegionAgeProfileDeviationGraphMixer',
    MixerMethodName: 'plot_region_profiles'
  }
};

export const defaultDataAgeValueInline: ProcessorConfiguration = {
  data: [
    {
      ...baseData,
      dadata_entry_ids: [508, 2074] //508 - id города Москва
    }
  ],
  processorSpecification: {
    ProccesorName: 'ClickAgeValueMultiProcessor',
    MixerName: 'MultiAgeValueGraphMixer',
    MixerMethodName: 'age_value_plots'
  }
};

export const defaultDataSTLProcessor: ProcessorConfiguration = {
  data: [
    {
      ...baseData,
      dadata_entry_ids: [508, 2074] //508 - id города Москва
    }
  ],
  processorSpecification: {
    ProccesorName: 'MultiTrendProcessor',
    MixerName: 'MultiTrendNewGraphMixer',
    MixerMethodName: 'plot_trends_and_medians'
  }
};
