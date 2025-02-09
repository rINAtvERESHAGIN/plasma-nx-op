import { GenderFemale } from '../../shared/draft-icons/gender-female/GenderFemale';
import { GenderEachsex } from '../../shared/draft-icons/gender-each-sex/GenderEachsex';
import { GenderMale } from '../../shared/draft-icons/gender-male/GenderMale';

export const radioOptions = [
  { label: 'Муж', value: '0', icon: <GenderMale /> },
  { label: 'Жен', value: '1', icon: <GenderFemale /> },
  { label: 'Любой', value: '-1', icon: <GenderEachsex /> },
];
