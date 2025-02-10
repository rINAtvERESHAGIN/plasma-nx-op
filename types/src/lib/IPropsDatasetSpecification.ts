

export interface IPropsDatasetSpecification {
  traceStatus: DatasetSpecificationStatus
  externalSubmit: (values: DatasetSpecificationForm) => void
  externalSubmitEditing: (value: DatasetSpecificationForm) => void
  initialValue?: any
}
