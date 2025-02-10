import React, { type PropsWithChildren } from 'react';
import { SubHeader } from './ui/ui.styled';

const SubHeaderRoot = ({ children }: PropsWithChildren<any>): React.ReactNode => {
  return <SubHeader sx={{ minHeight: '32px' }}>{children}</SubHeader>;
};

export default SubHeaderRoot;
