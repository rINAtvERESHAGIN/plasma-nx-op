import React from 'react';
import { OvalLabel, Label, StrokeIcon, Table, CalendarIcon, RoundAlarm } from '@plasma/ui';
import {
  TypeOfGrowthLabelContainer,
  CellContainer,
  ChangesCellContainer,
  ChangesCellContainerSign,
  ShowingContainer,
  WeeklyAvgSmoothedDeltaLabel,
  InitInfoContainer,
  LabelInitInfoParam
} from './ui.styled';
import { createColumnHelper } from '@tanstack/react-table';
import { getTypeOfGrowthLabel } from './utils';
import { type ProInflammatoryIndicators } from '@shared/api/model/ProInflammatoryIndicatorsTableData';

const columnHelper = createColumnHelper<ProInflammatoryIndicators>();

export const useColumns = () => {
  const columns = React.useMemo(() => {
    return [
      columnHelper.accessor(
        (row) => ({
          region: row.region,
          districtName: row.districtName,
          date: row.date,
          typeOfGrowthLabel: row.typeOfGrowthLabel
        }),
        {
          id: 'init-info',
          header: () => <th style={{ width: '270px' }} />,
          cell: (cell) => {
            const { region, districtName, date, typeOfGrowthLabel } = cell.getValue();
            return (
              <Table.TData>
                <InitInfoContainer>
                  <Label icon={<StrokeIcon color="orange" />} label={`${districtName}/${region}`} onClick={() => {}} />
                  <Label icon={<CalendarIcon color={'primary-main'} />} label={date.split(' ')[0]} onClick={() => {}} />
                  <TypeOfGrowthLabelContainer>
                    <RoundAlarm size={'xs'} type={getTypeOfGrowthLabel(typeOfGrowthLabel)} />
                    <LabelInitInfoParam>{typeOfGrowthLabel}</LabelInitInfoParam>
                  </TypeOfGrowthLabelContainer>
                </InitInfoContainer>
              </Table.TData>
            );
          },
          footer: (props) => props.column.id
        }
      ),
      columnHelper.accessor(
        (row) => ({
          weeklyCrpAvgSmoothedDelta: row.weeklyCrpAvgSmoothedDelta
        }),
        {
          id: 'weeklyCrpAvgSmoothedDelta',
          header: () => <th style={{ width: '90px' }} />,
          cell: (cell) => {
            const { weeklyCrpAvgSmoothedDelta } = cell.getValue();
            return (
              <Table.TData>
                <CellContainer>
                  <ChangesCellContainer>
                    <ChangesCellContainerSign>Изменения:</ChangesCellContainerSign>
                    <ShowingContainer>
                      <OvalLabel color="primary">СРБ</OvalLabel>
                      <WeeklyAvgSmoothedDeltaLabel>{weeklyCrpAvgSmoothedDelta}</WeeklyAvgSmoothedDeltaLabel>
                    </ShowingContainer>
                  </ChangesCellContainer>
                </CellContainer>
              </Table.TData>
            );
          },
          footer: (props) => props.column.id
        }
      ),
      columnHelper.accessor(
        (row) => ({
          weeklySiriAvgSmoothedDelta: row.weeklySiriAvgSmoothedDelta
        }),
        {
          id: 'weeklySiriAvgSmoothedDelta',
          header: () => <th style={{ width: '90px' }} />,
          cell: (cell) => {
            const { weeklySiriAvgSmoothedDelta } = cell.getValue();
            return (
              <Table.TData>
                <CellContainer>
                  <ChangesCellContainer>
                    <ShowingContainer>
                      <OvalLabel color="dark">SIRI</OvalLabel>
                      <WeeklyAvgSmoothedDeltaLabel>{weeklySiriAvgSmoothedDelta}</WeeklyAvgSmoothedDeltaLabel>
                    </ShowingContainer>
                  </ChangesCellContainer>
                </CellContainer>
              </Table.TData>
            );
          },
          footer: (props) => props.column.id
        }
      )
    ];
  }, []);
  return columns;
};
