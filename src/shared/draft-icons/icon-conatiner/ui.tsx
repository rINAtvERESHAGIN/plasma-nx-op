import { SvgIcon } from '@mui/material';
import React, { PropsWithChildren } from 'react';

interface IProps {}

export const IconSvgProvider = ({ children }: PropsWithChildren<IProps>) => {
  return <SvgIcon sx={{ height: '18px', width: '18px' }}>{children}</SvgIcon>;
};
