import { type DatasetSpecificationStatus } from 'dataset-specification-form/shared/types/DatasetSpecificationStatus';
import { type DatasetSpecificationForm } from '../ui/DatasetSpecificationForm';

export interface IPropsDatasetSpecification {
  traceStatus: DatasetSpecificationStatus
  externalSubmit: (values: DatasetSpecificationForm) => void
  externalSubmitEditing: (value: DatasetSpecificationForm) => void
  initialValue?: any
}
