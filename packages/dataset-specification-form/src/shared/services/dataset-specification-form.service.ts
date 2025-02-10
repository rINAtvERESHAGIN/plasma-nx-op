interface DatasetSpecification {
  ageRange: any;
  dateMin: any;
  dateMax: any;
  humanSex: any;
  parameter_ids: any;
  permission: any;
  selectedLab: any;
  selectedParameter: any;
  selectedRegion: any;
  processor: any;
  graphMixer: any;
  graphMixerFunction: any;
}

export class DatasetSpecificationFormService {
  public getDefaultInitialValue(
    parameters: any,
    labs: any,
    regions: any,
  ): DatasetSpecification {
    return {
      ageRange: [10, 50],
      dateMin: new Date('2015-01-01'),
      dateMax: new Date(),
      humanSex: '0',
      parameters: [8],
      permission: 'week',
      selectedLab:
        labs != null
          ? labs
              .filter((lab) => lab.name_ru === 'Инвитро')
              .reduce((acc, found) => found.id, 0)
          : 0,
      selectedParameter:
        parameters != null
          ? parameters
              .filter((parameter) => parameter.name_en === 'c_reactive_protein')
              .reduce((acc, found) => found.id, 0)
              .toString()
          : '0',
      selectedRegion: regions != null ? [regions['RU-MOW']] : undefined,
      processor: 'STLProcessor',
      graphMixer: 'TrendGraphMixer',
      graphMixerFunction: 'plot_heatmap_stl',
    };
  }
}

export const datasetSpecificationFormService =
  new DatasetSpecificationFormService();
