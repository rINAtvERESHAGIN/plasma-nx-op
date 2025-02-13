import { IconSvgProvider } from '../icon-conatiner/ui';

interface IProps {}

export const GenderMale = ({}: IProps) => {
  return (
    <IconSvgProvider>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M13 28C17.9706 28 22 23.9706 22 19C22 14.0294 17.9706 10 13 10C8.02944 10 4 14.0294 4 19C4 23.9706 8.02944 28 13 28Z'
          stroke='#242529'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M19.3623 12.6375L26.9998 5'
          stroke='#242529'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path d='M21 5H27V11' stroke='#242529' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
      </svg>
    </IconSvgProvider>
  );
};
