import React, { useState, useEffect } from 'react';
import { useParametersCore, useLabsCore, useRegionsCore } from '@org/store-redux';
import {
  AlignCenterVerticalIcon,
  LeafIcon,
  NutIcon,
  UnionIcon,
  RoundBadge,
  ArrowsDownUpIcon,
  TableFilter,
  Table
} from '@plasma/ui';
import {
  Row,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';
import { isNil } from 'lodash';
import { TableContainer, TableFilterContainer, TableScrollableContainer } from './ui.styled';
import { useColumns } from './useColumns';
import { type AnomalyTableProps } from './type';
import { AnomalyTableData } from 'types';
import { AnomaliesTableService } from '../../shared';
import { getSelectViewParameters, getAutocompleteViewRegions, getSelectViewLabs } from '../trace-form/lib/getSelectViewParameters';

export const AnomalyTable: React.FunctionComponent<AnomalyTableProps> = ({ onRowClick }) => {
  const parameters = useParametersCore().data;
  const labs = useLabsCore().data;
  const regions = useRegionsCore().data;
  const [tableData, setTableData] = useState<AnomalyTableData[] | undefined>(undefined);
  const [prevRow, setPrevRow] = useState<undefined | number>(undefined);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnomaliesTableData = async (): Promise<void> => {
      try {
        const response = await AnomaliesTableService.requestGetAnomaliesTable();
        const responseData = JSON.parse(response);
        setData(responseData.data || []);
      } catch (e) {
        setError('Ошибка загрузки данных.');
      } finally {
        setLoading(false);
      }
    };
    getAnomaliesTableData().catch((e) => {
      console.error(e);
    });
  }, []);

  const handleMouseOver = (rowId: number) => () => {
    if (rowId !== 0) setPrevRow(rowId);
    else setPrevRow(1);
  };

  const handleMouseOut = (): void => {
    setPrevRow(undefined);
  };

  useEffect(() => {
    if (!isNil(data)) setTableData(data as AnomalyTableData[]);
  }, [data]);

  const tableColumns = useColumns();

  const table = useReactTable({
    data: tableData ?? [],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    }
  });

  const [otherDistributionSort, setOtherDistributionSort] = useState<
    (() => undefined | ((event: unknown) => void)) | undefined
  >(undefined);
  const [meanChange, setMeanChangeSort] = useState<(() => undefined | ((event: unknown) => void)) | undefined>(
    undefined
  );
  const [seasonality, setSeasonalitySort] = useState<(() => undefined | ((event: unknown) => void)) | undefined>(
    undefined
  );
  const [technicalArtifact, setTechnicalArtifactSort] = useState<
    (() => undefined | ((event: unknown) => void)) | undefined
  >(undefined);

  useEffect(() => {
    const { headers } = table.getHeaderGroups().reduce((acc, headers) => {
      return headers;
    });
    const [, other_distribution_pvalue, mean_change_pvalue, seasonality, technical_artifact] = headers;

    setOtherDistributionSort(
      other_distribution_pvalue.column.getCanSort()
        ? other_distribution_pvalue.column.getToggleSortingHandler
        : undefined
    );

    setMeanChangeSort(
      mean_change_pvalue.column.getCanSort() ? mean_change_pvalue.column.getToggleSortingHandler : undefined
    );

    setSeasonalitySort(seasonality.column.getCanSort() ? seasonality.column.getToggleSortingHandler : undefined);

    setTechnicalArtifactSort(
      technical_artifact.column.getCanSort() ? technical_artifact.column.getToggleSortingHandler : undefined
    );
  }, [table]);

  const handleRowClick = (row: Row<AnomalyTableData>): void => {
    if (!isNil(parameters) && !isNil(labs) && !isNil(regions)) {
      const parameter = parameters.find((parameter) => parameter.name_ru === row.original.param_name);
      const lab = labs.find((lab) => lab.name_ru === row.original.lab_name);
      const region = Object.values(regions).find((region) => region.name_ru === row.original.region_name);

      if (!isNil(parameter) && !isNil(lab) && !isNil(region)) {
        onRowClick(
          getSelectViewParameters(parameter).value,
          getAutocompleteViewRegions(region).value.id,
          getSelectViewLabs(lab).value
        );
      }
    }
  };

  return (
    <TableContainer id="_table-container">
      <TableFilterContainer>
        <TableFilter
          deleteIcon={<ArrowsDownUpIcon />}
          icon={
            <RoundBadge sx={{ bgcolor: '#ED8C56', height: '22px', width: '22px' }}>
              <UnionIcon />
            </RoundBadge>
          }
          label="Вероятность отличия"
          onClick={otherDistributionSort && otherDistributionSort}
          onDelete={() => {}}
        />
        <TableFilter
          deleteIcon={<ArrowsDownUpIcon />}
          icon={
            <RoundBadge sx={{ bgcolor: '#ACE071', height: '22px', width: '22px' }}>
              <AlignCenterVerticalIcon />
            </RoundBadge>
          }
          label="Среднее изменение между периодами"
          onClick={meanChange && meanChange}
          onDelete={() => {}}
        />
        <TableFilter
          deleteIcon={<ArrowsDownUpIcon />}
          icon={
            <RoundBadge sx={{ bgcolor: '#47CBCA', height: '22px', width: '22px' }}>
              <LeafIcon />
            </RoundBadge>
          }
          label="Сезонность"
          onClick={seasonality && seasonality}
          onDelete={() => {}}
        />
        <TableFilter
          deleteIcon={<ArrowsDownUpIcon />}
          icon={
            <RoundBadge sx={{ bgcolor: '#E9DDAB', height: '22px', width: '22px' }}>
              <NutIcon />
            </RoundBadge>
          }
          label="Технический артефакт"
          onClick={technicalArtifact && technicalArtifact}
          onDelete={() => {}}
        />
      </TableFilterContainer>
      <TableScrollableContainer>
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <React.Fragment key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </thead>
          <Table.TBody rowIndex={prevRow}>
            {table.getRowModel().rows.map((row, index) => (
              <Table.TRow
                key={row.id}
                onClick={() => handleRowClick(row)}
                onMouseOver={handleMouseOver(index)}
                onMouseOut={handleMouseOut}
              >
                {row.getVisibleCells().map((cell) => (
                  <React.Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </React.Fragment>
                ))}
              </Table.TRow>
            ))}
          </Table.TBody>
        </Table>
      </TableScrollableContainer>
    </TableContainer>
  );
};
