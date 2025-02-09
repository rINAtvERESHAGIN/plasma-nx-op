import { type DatasetSpecification } from '@shared/api/model/Comparison';
import { makeRequired, makeValidate } from 'mui-rff';
import { array, number, object, string, tuple } from 'yup';

interface DatasetSpecificationForm {
    ageRange: Array<number | undefined>;
    dateMin: string;
    dateMax: string;
    humanSex: string;
    parameter: number;
    permission: string;
    selectedLab: any;
    selectedParameter: any;
    selectedRegion: any;
}

const schema = object({
  ageRange: tuple([number().label('age-min'), number().label('age-max')]).required('Возвраст не указан.'),
  dateMin: string().required('Дата не указана.'),
  dateMax: string().required('Дата не указана.'),
  humanSex: string().required('Пол не указан.'),
  parameters: array()
    .test({
      name: 'parameters',
      skipAbsent: true,
      test: (value, context) => {
        if (value?.length === 0) {
          return context.createError({ message: 'Должен быть указан, хотя бы один параметр.' });
        }
        return true;
      }
    })
    .required('Параметр не указан.'),
  permission: string().required('Разрешение не указано.'),
  selectedLab: string().required('Лаборатория не указана.'),
  selectedRegion: array()
    .test({
      name: 'selectedRegion',
      skipAbsent: true,
      test: (value, context) => {
        if (value?.length === 0) {
          return context.createError({ message: 'Должен быть указан, хотя бы один регион.' });
        }
        return true;
      }
    })
    .required('Регион не указан.'),
  processor: string().nullable(),
  graphMixer: string().nullable(),
  raphMixerFunction: string().nullable()
});

export const traceRequired = makeRequired<DatasetSpecification>(schema);
export const traceValidation = makeValidate(schema);
