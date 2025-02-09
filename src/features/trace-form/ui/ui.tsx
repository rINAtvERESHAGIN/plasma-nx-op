import { type DatasetSpecification } from '@shared/api/model/Comparison';

export interface DatasetSpecificationForm extends Omit<DatasetSpecification, 'ageRange'> {
  ageRange: number[]
}

export default DatasetSpecificationForm;
