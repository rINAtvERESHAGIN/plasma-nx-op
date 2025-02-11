import React from 'react';
import Fab from '@mui/material/Fab';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAppDispatch, useAppSelector } from '@org/store-redux.ts';
import { setOpenSettings, setOpenTimeLine } from '@pages/main-page-split/model';

function FloatingButtonWithPopover(): React.ReactNode {
  const dispatch = useAppDispatch();
  const openSettings = useAppSelector((state) => state.ui.openSettings);

  const handleClickOpen = () => {
    dispatch(setOpenSettings(!openSettings));
    dispatch(setOpenTimeLine(true));
  };

  return (
    <Fab onClick={handleClickOpen} size="small" style={{ backgroundColor: '#ffffff' }} aria-label="settings">
      <SettingsIcon />
    </Fab>
  );
}

export default FloatingButtonWithPopover;
