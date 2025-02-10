import { type RadioData } from 'mui-rff';

export const genderRadioOptions: RadioData[] = [
  { label: 'Жен', value: '0' },
  { label: 'Муж', value: '1' },
  { label: 'Любой', value: '2' },
];

export const permissionRadioOptions: RadioData[] = [
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
];
