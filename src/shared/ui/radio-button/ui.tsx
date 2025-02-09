import React from 'react';
import { Label } from '@plasma/ui';
import type { CustomRadioButtonProps } from './types';
import { StyledRadioButton } from './ui.styled';

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  value,
  label,
  icon,
  selected,
  disabled = false,
  onClick
}) => {
  const handleClick = () => !disabled && onClick(value);

  return (
    <StyledRadioButton $selected={selected} $disabled={disabled} onClick={handleClick}>
      <Label label={label} icon={icon} />
    </StyledRadioButton>
  );
};

export default CustomRadioButton;
