import React from 'react';
import styled from 'styled-components';
import { Popover } from '@mui/material';
import { type IRegion } from '@shared/api/yuh-client-api/models/Region';
import PlateMapCellPopCard from '../plate-map-cell-pop-up-card/ui';
import { Cell, type ICellProps } from '../../../shared/ui/cell/ui';

const CellContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface IProps extends Omit<ICellProps, 'onClick'>, IRegion {
  /**
   * Функция обработчик нажатия на ячейку */
  onClick?: () => void
}

export function PlateMapCellContent ({
  children, onClick, colorMarker, date, name, detector_now, code, onMouseLeave, onMouseEnter
}: IProps): React.ReactNode {
  const regionData = React.useMemo<IRegion>(() => ({
    date, code, name, detector_now
  }), [date, name, code, detector_now]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = React.useMemo(() => Boolean(anchorEl), [anchorEl]);

  const id = React.useMemo(() => (open ? 'simple-popover' : undefined), [open]);

  return (
    <CellContainer>
      <Cell onClick={handleClick} colorMarker={colorMarker} regionCode={code} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
        {children}
      </Cell>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <PlateMapCellPopCard {...regionData} />
      </Popover>
    </CellContainer>
  );
}
