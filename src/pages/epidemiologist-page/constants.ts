import { type DataSpecification, type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
import { SIRI } from '@shared/config/const/bio-indexes';

export const baseData: DataSpecification = {
  parameter_ids: [27],
  date_min: '2015-01-01',
  date_max: new Date().toISOString().split('T')[0],
  lab_ids: [8],
  region_ids: [42],
  sex: -1,
  age_min: 0,
  age_max: 100
};

export const defaultDataIndexes: ProcessorConfiguration = {
  data: [
    {
      ...baseData,
      parameter_ids: [8, ...SIRI],
      date_min: '2024-04-25'
    }
  ],
  processorSpecification: {
    ProccesorName: 'LED_CRP_SIRI_Processor',
    MixerName: 'LED_CRP_SIRI_GraphMixer',
    MixerMethodName: 'plot_siri_and_crp'
  }
};
