import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';

export type RegionId = number | null;

export type UpdateDataSetHelper = (defaultData: ProcessorConfiguration, regionId: RegionId) => ProcessorConfiguration;
