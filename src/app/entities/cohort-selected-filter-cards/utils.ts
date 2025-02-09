import { genderIcons } from './icons';

export const getGenderIcon = (gender: string): JSX.Element => genderIcons[gender];
