import { type FunctionComponent } from 'react';
import { StyledButton } from './ui.styled';
import type { SelectableButtonProps } from './types';

export const SelectableButton: FunctionComponent<SelectableButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <StyledButton $isActive={isActive} onClick={onClick}>
      {label}
    </StyledButton>
  );
};
