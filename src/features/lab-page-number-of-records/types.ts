import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
export interface YearButtonProps {
  isActive: boolean;
}

export interface NumberOfRecordsChartsProps {
  dataWeeklyMeasurement: ProcessorConfiguration;
  dataDeviceRecords: ProcessorConfiguration;
  onDeviceSelect: (device: string) => void;
}
