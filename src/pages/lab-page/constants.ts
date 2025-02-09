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

export const defaultDataGeoCity: ProcessorConfiguration = {
  data: [
    {
      ...baseData,
      region_ids: []
    }
  ],
  processorSpecification: {
    ProccesorName: 'GeoCityProcessor',
    MixerName: 'GeoCityGraphMixer',
    MixerMethodName: 'plot_data_points_map'
  }
};

export const defaultDataDeviceMedian: ProcessorConfiguration = {
  data: [
    {
      ...baseData,
      get_device_id: true
    }
  ],
  processorSpecification: {
    ProccesorName: 'ClickDeviceMedianProcessor',
    MixerName: 'DeviceMedianGraphMixer',
    MixerMethodName: 'plot_device_median_and_stats'
  }
};

export const defaultDataWeeklyMeasurement: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'WeeklyMeasurementProcessor',
    MixerName: 'WeeklyMeasurementGraphMixer',
    MixerMethodName: 'plot_heatmap_of_measurement'
  }
};

export const defaultDataDeviceRecords: ProcessorConfiguration = {
  data: [baseData],
  processorSpecification: {
    ProccesorName: 'DeviceRecordsProcessor',
    MixerName: 'DeviceRecordsGraphMixer',
    MixerMethodName: 'plot_barchart_of_devices'
  }
};
