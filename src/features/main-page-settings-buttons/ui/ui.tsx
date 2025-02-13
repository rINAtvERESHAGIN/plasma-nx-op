import React from 'react';
import FloatingButtonWithPopover from '../../floating-action-button-with-popover/ui/ui.tsx';
import SwitchIconButton from '@shared/ui/switch-icon/ui.tsx';
import { useAppDispatch, useAppSelector } from '@org/store-redux.ts';
import { Container, IconButtonContainer } from '../../main-page-settings-buttons/ui/ui.styled';
import { setOpenSettings, setOpenTimeLine } from '@pages/main-page-split/model';

const SettingButtons = () => {
  const dispatch = useAppDispatch();
  const openTimeLine = useAppSelector((state) => state.ui.openTimeLine);

  const handleToggleTimeLine = () => {
    dispatch(setOpenTimeLine(!openTimeLine));
    dispatch(setOpenSettings(false));
  };

  return (
    <Container id="setting-buttons-container">
      <FloatingButtonWithPopover />
      <IconButtonContainer>
        <SwitchIconButton onClick={handleToggleTimeLine} />
      </IconButtonContainer>
    </Container>
  );
};

export default SettingButtons;
