import { type DatasetSpecification } from '@shared/api/model/Comparison';
import { type RequestCohortaData } from './type';
import dayjs from 'dayjs';

const CASUAL_DATE_FORMAT = 'YYYY-MM-DD';

const formateDate = (date: string) => dayjs(date).format(CASUAL_DATE_FORMAT);

export const converterFormData = (cohort: DatasetSpecification): RequestCohortaData => {
  const [ageMin, ageMax] = cohort.ageRange;
  const requestData: RequestCohortaData = {
    parameter_ids: cohort.parameters,
    date_min: formateDate(cohort.dateMin),
    date_max: formateDate(cohort.dateMax),
    device_id: null,
    lab_id: Number.parseInt(cohort.selectedLab),
    region_ids: cohort.selectedRegion.map((region) => region.id),
    sex: 0,
    age_min: ageMin,
    age_max: ageMax
  };

  return requestData;
};

export const convertorProcessorSpecification = (cohort) => {
  return {
    ProccesorName: cohort.processor,
    MixerName: cohort.graphMixer,
    MixerMethodName: cohort.graphMixerFunction
  };
};
