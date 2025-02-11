import React, { useState, useEffect } from 'react';
import { useRegionsCore } from '@org/store-redux';
import { TableFilter, ArrowsDownUpIcon, OvalLabel, Table } from '@plasma/ui';
import { TableFilterContainer, TableContainer } from './ui.styled';
import { getAutocompleteViewRegions } from '../../trace-form/lib/getSelectViewParameters';
import { isNil } from 'lodash';
import {
  type SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type Row
} from '@tanstack/react-table';
import { useColumns } from './useColumns';
import { type ProInflammatoryIndicators } from '@shared/api/model/ProInflammatoryIndicatorsTableData';
import { type ProInflammatoryIndicatorsTableProps } from './type';
import { getProInflammatoryIndicatorsTableData } from './utils';

export const ProInflammatoryIndicatorsTable: React.FunctionComponent<ProInflammatoryIndicatorsTableProps> = ({
  onRowClick
}) => {
  const regions = useRegionsCore().data;
  const [data, setData] = useState<ProInflammatoryIndicators[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProInflammatoryIndicatorsTableData()
      .then((mappedData) => {
        if (!isNil(mappedData)) {
          setData(mappedData);
        }
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRowClick = (row: Row<ProInflammatoryIndicators>): void => {
    if (!isNil(regions)) {
      const region = Object.values(regions).find((region) => region.name_ru === row.original.region);
      if (!isNil(region)) {
        onRowClick(getAutocompleteViewRegions(region).value.id);
      }
    }
  };

  const [tableData, setTableData] = useState<ProInflammatoryIndicators[] | undefined>(undefined);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [prevRow, setPrevRow] = useState<undefined | number>(undefined);

  const handleMouseOver = (rowId: number) => () => {
    if (rowId !== 0) setPrevRow(rowId);
    else setPrevRow(1);
  };

  const handleMouseOut = (): void => {
    setPrevRow(undefined);
  };

  useEffect(() => {
    if (!isNil(data)) setTableData(data);
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

  const [weeklySiriAvgSmoothedDeltaSort, setWeeklySiriAvgSmoothedDeltaSort] = useState<
    undefined | ((event: unknown) => void)
  >(undefined);
  const [weeklyCrpAvgSmoothedDeltaSort, setWeeklyCrpAvgSmoothedDeltaSort] = useState<
    undefined | ((event: unknown) => void)
  >(undefined);

  useEffect(() => {
    const { headers } = table.getHeaderGroups().reduce((acc, headers) => {
      return headers;
    });
    const [, weeklySiriAvgSmoothedDelta, weeklyCrpAvgSmoothedDelta] = headers;

    setWeeklySiriAvgSmoothedDeltaSort(
      weeklySiriAvgSmoothedDelta.column.getCanSort()
        ? weeklySiriAvgSmoothedDelta.column.getToggleSortingHandler
        : undefined
    );

    setWeeklyCrpAvgSmoothedDeltaSort(
      weeklyCrpAvgSmoothedDelta.column.getCanSort()
        ? weeklyCrpAvgSmoothedDelta.column.getToggleSortingHandler
        : undefined
    );
  }, [table]);

  return (
    <TableContainer>
      <TableFilterContainer>
        <TableFilter
          deleteIcon={<ArrowsDownUpIcon />}
          icon={<OvalLabel color="primary">СРБ</OvalLabel>}
          label="Изменения СРБ"
          onClick={weeklyCrpAvgSmoothedDeltaSort && weeklyCrpAvgSmoothedDeltaSort}
          onDelete={() => {}}
        />
        <TableFilter
          deleteIcon={<ArrowsDownUpIcon />}
          icon={<OvalLabel color="dark">SIRI</OvalLabel>}
          label="Изменения SIRI"
          onClick={weeklySiriAvgSmoothedDeltaSort && weeklySiriAvgSmoothedDeltaSort}
          onDelete={() => {}}
        />
      </TableFilterContainer>
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
    </TableContainer>
  );
};
