import { DateMax } from '../ui/DateMax';
import { DateMin } from '../ui/DateMin';
import AgeDatasetSpecification from '../ui/age';
import HumanSexDatasetSpecification from '../ui/human-sex';
import LabDatasetSpecification from '../ui/lab';
import ParameterDatasetSpecification from '../ui/parameter';
import PermissionDatasetSpecification from '../ui/permission';
import RegionDatasetSpecification from '../ui/region';

export const fields = [
  ParameterDatasetSpecification,
  LabDatasetSpecification,
  RegionDatasetSpecification,
  DateMin,
  DateMax,
  HumanSexDatasetSpecification,
  AgeDatasetSpecification,
  PermissionDatasetSpecification,
];
