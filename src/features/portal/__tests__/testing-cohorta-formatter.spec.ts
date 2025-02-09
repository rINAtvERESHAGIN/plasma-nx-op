import { converterFormData } from '../portal.utils';

describe('testing converter for cohorta form', () => {
  it('testing converter', () => {
    const cohortaData = {
      date: '2015-01-01T00:00:00.000Z',
      ageRange: [10, 50],
      humanSex: '0',
      parameter: 0,
      permission: 'week',
      selectedLab: 8,
      selectedRegion: [
        {
          id: 42,
          name_ru: 'Москва',
          iso_code: 'RU-MOW',
          district_name: 'Центральный ФО'
        }
      ],
      selectedParameter: '8'
    };

    const correctData = {
      parameter_id: 8,
      date_min: '2015-01-01',
      date_max: '2024-01-01',
      device_id: null,
      lab_id: 8,
      region_ids: [42],
      sex: 0,
      age_min: 10,
      age_max: 50
    };
    expect(converterFormData(cohortaData)).toEqual(correctData);
  });
});
