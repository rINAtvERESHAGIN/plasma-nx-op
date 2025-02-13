import { IconSvgProvider } from '../icon-conatiner/ui';

interface IProps {}

export const GenderFemale = ({}: IProps) => {
  return (
    <IconSvgProvider>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M16 21C20.9706 21 25 16.9706 25 12C25 7.02944 20.9706 3 16 3C11.0294 3 7 7.02944 7 12C7 16.9706 11.0294 21 16 21Z'
          stroke='#242529'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path d='M16 21V30' stroke='#242529' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
        <path d='M11 26H21' stroke='#242529' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
      </svg>
    </IconSvgProvider>
  );
};
