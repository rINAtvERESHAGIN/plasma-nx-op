import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useAppDispatch, useAppSelector } from '@org/store-redux';
import { addRegionId, removeRegionId } from '@features/mapbox/ui/model';
import { RegionName, StyledMenu } from '@entities/map-context-menu/ui.styled';

interface IProps {
    open: boolean;
    onClose: () => void;
    anchorCoordinates: { x: number, y: number } | null;
    children: React.ReactNode;
}

function ContextMenu({ open, onClose, anchorCoordinates, children, regionId }: IProps): React.ReactNode {
  const dispatch = useAppDispatch();
  const { x, y } = anchorCoordinates || {};

  const handleAdd = (): void => {
    dispatch(addRegionId(regionId.properties.name));
    onClose();
  };

  const handleDelete = (): void => {
    dispatch(removeRegionId(regionId.properties.name));
    onClose();
  };

  const regionInList = useAppSelector((state) =>
    state.regionBasket.data.includes(regionId.properties.name)
  );

  return (
    <StyledMenu
      anchorReference="anchorPosition"
      anchorPosition={x !== undefined && y ? { top: y, left: x } : undefined}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
    >
      <RegionName>{children}</RegionName>
      <Divider />
      <MenuItem onClick={handleAdd} disabled={regionInList}>
                Добавить в сравнение
      </MenuItem>
      <MenuItem onClick={handleDelete}>Удалить из сравнения</MenuItem>
      <MenuItem onClick={onClose}>Закрыть</MenuItem>
    </StyledMenu>
  );
}

export default ContextMenu;
