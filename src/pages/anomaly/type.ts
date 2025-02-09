import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';

export type ActiveStatTestButton = 'currentYear' | 'bothYears';

export type GraphMixerFunction = 'violin_plot_cur_year' | 'violin_plot_comparison';

export type UpdateDataSetHelper = (
  defaultData: ProcessorConfiguration,
  paramId: number | null,
  regionId: number | null,
  labId: number | null,
) => ProcessorConfiguration;

export type UpdateDataSet = (paramId: number | null, regionId: number | null, labId: number | null) => void;
