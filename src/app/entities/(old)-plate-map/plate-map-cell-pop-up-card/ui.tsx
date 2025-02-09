import React from 'react';
import { type CardProps } from '@mui/material';
import { type IRegion } from '@shared/api/yuh-client-api/models/Region';
import { PopUpCard } from '../../../shared/ui/index';

interface IProps extends CardProps, IRegion {

}

function PlateMapCellPopCard (props: IProps): React.ReactNode {
  const { children, ...regionData } = props;

  return (
    <PopUpCard {...regionData} />
  );
}

export default PlateMapCellPopCard;
