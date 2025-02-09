import { GenderFemale } from '../../shared/draft-icons/gender-female/GenderFemale';
import { GenderMale } from '../../shared/draft-icons/gender-male/GenderMale';
import { GenderEachsex } from '../../shared/draft-icons/gender-each-sex/GenderEachsex';

export const genderIcons: Record<string, JSX.Element> = {
  '1': <GenderFemale />,
  '0': <GenderMale />,
  '-1': <GenderEachsex />,
};
