import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Grow } from '@mui/material';
import { type ICellProps } from '@shared/ui/cell/ui';
import { type IRegionData } from '@shared/api/yuh-client-api/models/RegionData';
import { PlateMapCellContent } from '../plate-map-cell/ui';
import { useActiveDate } from '@shared/model/system-operator';

const Table = styled.table`
  border-collapse: collapse;
  width: 70%;
`;

const TableData = styled.td<{
  isDisplay?: boolean
  backGroundMarker?: string
}>`
  display: ${(props) => (props.isDisplay ? 'table-cell' : 'none')};
  background-color: ${(props) => (props.backGroundMarker ? props.backGroundMarker : 'transparent')};
  height: 30px;
  min-width: 30px;
  vertical-align: center;
  font-size: 12px;
  gap: 4px;
  z-index: 5;
  right: 0;
  text-align: center;
  transition: top ease 0.5s;
  position: relative;
  top: 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px 2px rgba(0, 0, 0, 0.25);
  }

`;

const TableRow = styled.tr<{ active?: boolean }>`
  position: relative;
  cursor: pointer;
  user-select: none;
  display: ${(props) => (props.active ? 'table-row' : 'none')};
`;

const CellContainer = styled.div<{ backGroundMarker?: string }>`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: ${(props) => (props.backGroundMarker ? props.backGroundMarker : 'transparent')};
`;

const color1 = '#ff4400';
const color2 = '#ed683c';
// const color3 = '#f3903f'
// const color4 = '#fdc70c'
const color5 = '#fff33b';
const color6 = '#4caf50';

const RegionCellGradientCell = styled.div<{
  backGroundMarker?: string
  colorGradientPercent?: number
}>`
  background: ${({ backGroundMarker, colorGradientPercent }) => (backGroundMarker || (colorGradientPercent
    ? `linear-gradient(to left, ${color6} ${colorGradientPercent * 100}%,${color5},${color2},${color1})`
    : 'transparent'))};
  height: 100%;
  width: 100%;
  transition: all ease 0.2s;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px 2px rgba(0, 0, 0, 0.25);
  }
`;

const RegionCellFullColor = styled.div<{
  backGroundMarker?: string
  colorGradientPercent?: number
}>`
  background-color: ${({ colorGradientPercent }) => (colorGradientPercent
    ? `hsl( ${((1 - colorGradientPercent) * 100).toFixed()} , 80%, 55%, 0.90)`
    : 'transparent')};
  height: 100%;
  width: 100%;
  transition: all ease 0.2s;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: 100%;

  /* поднятие элемента при наведении курсора*/

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px 2px rgba(0, 0, 0, 0.25);
  }

  /* эффект нажатия на кнопку*/

  &:active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;

export interface IPlateMapProps extends Pick<ICellProps, 'onMouseEnter' | 'onMouseLeave'> {
  /**
   * Данные по всем регионам в объекте где ключ - код региона
   * */
  regions: IRegionData
  /**
   * Двумерный массив шаблон с ключами, где ключ - код региона
   * */
  gridRegionMapTemplate: Array<Array<string | null>>
}

export function PlateMap ({
  regions, gridRegionMapTemplate, onMouseEnter, onMouseLeave
}: IPlateMapProps): React.ReactNode {

  // const selectedDate = useAppSelector((state) => state.timeline.selectedDate)
  const selectedDate = useActiveDate();

  const date = useMemo<string>(() => {
    if (selectedDate) {
      return selectedDate;
    }

    if (regions) {
      return Object.keys(regions)[0];
    }

    return '';
  }, [selectedDate]);

  return (
    <Table>
      {gridRegionMapTemplate.map((row, index) => (
        <TableRow key={index} active>
          {row.map((regionKey: string | null, index) => {
            if (regionKey !== null) {
              const regionData = regions[date][regionKey];
              if (regionData) {
                return (
                  <Grow
                    key={regionData.code}
                    in
                    style={{ transformOrigin: '0 0 0' }}
                    {...({ timeout: 1000 + index * 200 })}
                  >
                    <TableData isDisplay>
                      <PlateMapCellContent
                        name={regionData.name}
                        date={regionData.date}
                        code={regionData.code}
                        detector_now={regionData.detector_now}
                        colorMarker={regionData.detector_now}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                      >
                        {regionData.code}
                      </PlateMapCellContent>
                    </TableData>
                  </Grow>
                );
              }
            }
            return <TableData isDisplay><CellContainer /></TableData>;
          })}
        </TableRow>
      ))}
    </Table>
  );
}
