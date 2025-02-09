import { SvgIcon } from '@mui/material';

interface IProps {}

export const InfoIcon = ({}: IProps) => {
  return (
    <SvgIcon sx={{ height: '20px', width: '20px' }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16Z"
          fill="#242529"
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M14 15C14 14.4477 14.4477 14 15 14H16C16.5523 14 17 14.4477 17 15V21C17.5523 21 18 21.4477 18 22C18 22.5523 17.5523 23 17 23H16C15.4477 23 15 22.5523 15 22V16C14.4477 16 14 15.5523 14 15Z'
          fill='currentColor'
        />
        <path
          d='M15.75 12C16.5784 12 17.25 11.3284 17.25 10.5C17.25 9.67157 16.5784 9 15.75 9C14.9216 9 14.25 9.67157 14.25 10.5C14.25 11.3284 14.9216 12 15.75 12Z'
          fill='currentColor'
        />
      </svg>
    </SvgIcon>
  );
};
