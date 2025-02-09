import React, { useState } from 'react';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { StyledFab } from '@shared/ui/switch-icon/ui.styled.ts';

const SwitchIconButton = ({ onClick }: { onClick: () => void }): React.ReactNode => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (): void => {
    if (isActive) {
      setIsActive(false);
      onClick();
    } else {
      setIsActive(true);
      onClick();
    }
  };

  return (
    <StyledFab onClick={handleClick} isActive={isActive} size="small">
      <QueryBuilderIcon />
    </StyledFab>
  );
};

export default SwitchIconButton;
