import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import {
  AlignCenterVerticalIcon,
  LeafIcon,
  NutIcon,
  UnionIcon,
  RoundBadge,
  Table,
  StrokeIcon,
  Label,
  TimePeriod
} from '@plasma/ui';
import { Cell, IconWithSignContainer, InitInfoContainer, LabelInitInfoParam, Sign } from './ui.styled';
import { type AnomalyTableData } from '@shared/api/model/AnomalyTableData';

const columnHelper = createColumnHelper<AnomalyTableData>();

export const useColumns = () => {
  const columns = React.useMemo(() => {
    return [
      columnHelper.accessor(
        (row) => ({
          param_name: row.param_name,
          region_name: row.region_name,
          lab_name: row.lab_name
        }),
        {
          id: 'init-info',
          header: (header) => <Table.THeader style={{ width: '310px' }} />,
          cell: (cell) => {
            const { param_name, region_name, lab_name } = cell.getValue();
            return (
              <Table.TData>
                <Cell>
                  <InitInfoContainer>
                    <Label icon={<StrokeIcon />} label={region_name} onClick={() => {}} />
                    <Label label={lab_name} onClick={() => {}} />
                    <LabelInitInfoParam>{param_name}</LabelInitInfoParam>
                  </InitInfoContainer>
                </Cell>
              </Table.TData>
            );
          },
          footer: (props) => props.column.id
        }
      ),
      //
      columnHelper.accessor((row) => row.other_distribution_pvalue, {
        id: 'other_distribution_pvalue',
        header: (header) => <Table.THeader style={{ width: '100px' }} />,
        cell: (cell) => {
          const other_distribution_pvalue = cell.getValue();
          return (
            <Table.TData>
              <IconWithSignContainer>
                <RoundBadge
                  sx={{
                    bgcolor: '#ED8C56',
                    width: '22px',
                    height: '22px'
                  }}
                >
                  <UnionIcon />
                </RoundBadge>
                <Sign>{other_distribution_pvalue.toFixed(3) ?? '-'}</Sign>
              </IconWithSignContainer>
            </Table.TData>
          );
        },
        footer: (props) => props.column.id
      }),
      columnHelper.accessor((row) => row.mean_change_pvalue, {
        id: 'mean_change_pvalue',
        header: (header) => <Table.THeader style={{ width: '100px' }} />,
        cell: (cell) => {
          const mean_change_pvalue = cell.getValue();
          return (
            <Table.TData>
              <IconWithSignContainer>
                <RoundBadge
                  sx={{
                    bgcolor: '#ACE071',
                    width: '22px',
                    height: '22px'
                  }}
                >
                  <AlignCenterVerticalIcon />
                </RoundBadge>
                <Sign>{mean_change_pvalue.toFixed(3) ?? '-'}</Sign>
              </IconWithSignContainer>
            </Table.TData>
          );
        },
        footer: (props) => props.column.id
      }),
      //
      columnHelper.accessor((row) => row.seasonality, {
        id: 'seasonality',
        header: (header) => <Table.THeader style={{ width: '30px' }} />,
        cell: (cell) => {
          const seasonality = cell.getValue();
          return (
            <Table.TData>
              <IconWithSignContainer>
                <RoundBadge
                  sx={{
                    bgcolor: seasonality === 'Не выражена' ? '#bdbdbd' : '#47CBCA',
                    width: '22px',
                    height: '22px'
                  }}
                >
                  <LeafIcon />
                </RoundBadge>
              </IconWithSignContainer>
            </Table.TData>
          );
        },
        footer: (props) => props.column.id
      }),
      columnHelper.accessor((row) => row.technical_artifact, {
        id: 'technical_artifact',
        header: (header) => <Table.THeader style={{ width: '30px' }} />,
        cell: (cell) => {
          const technical_artifact = cell.getValue();
          return (
            <Table.TData>
              <IconWithSignContainer>
                <RoundBadge
                  sx={{
                    bgcolor: technical_artifact === 'Вероятно' ? '#E9DDAB' : '#bdbdbd',
                    width: '22px',
                    height: '22px'
                  }}
                >
                  <NutIcon />
                </RoundBadge>
              </IconWithSignContainer>
            </Table.TData>
          );
        },
        footer: (props) => props.column.id
      }),
      columnHelper.accessor(
        (row) => ({
          base_start_date: row.base_start_date,
          base_end_date: row.base_end_date
        }),
        {
          id: 'start-end',
          header: (header) => <Table.THeader style={{ width: '300px' }} />,
          cell: (cell) => {
            const { base_start_date, base_end_date } = cell.getValue();
            return (
              <Table.TData>
                <div style={{ width: '300px' }}>
                  <TimePeriod />
                </div>
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
