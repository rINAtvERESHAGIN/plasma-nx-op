import { type Parameter } from '@shared/api/model/Parameter';
import { type ILabs } from '@shared/model/labs';
import { type Region } from '@shared/model/regions';

export const getSelectViewParameters = (parameter: Parameter) => ({
  label: parameter.name_ru,
  value: parameter.id,
  description: parameter.description_ru
});
export const getSelectViewLabs = (lab: ILabs) => ({ label: lab.name_ru, value: lab.id });
export const getAutocompleteViewRegions = (region: Region) => ({ label: region.name_ru, value: region });
export const getSelectViewProcessors = (processor) => ({ label: processor.class_name, value: processor.class_name });
export const getAutoCompleteViewParameters = (parameter: Parameter) => ({
  label: parameter.name_ru,
  value: parameter.id
});
