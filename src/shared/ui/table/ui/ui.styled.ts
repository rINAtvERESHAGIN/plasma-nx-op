import styled from 'styled-components';

export const TableContainer = styled.div`
    display: grid;
    grid-template-columns: auto;
    align-items: start;
    gap: 10px;
    @media print {
        margin-top: 24px;
        margin-bottom: 24px;
    }
`;

export const Table = styled.table`
    border-collapse: collapse;
    width: 70%;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableFooter = styled.tfoot``;

export const TableRow = styled.tr<{ active?: boolean }>`
    position: relative;
    cursor: pointer;
    user-select: none;
    display: ${(props) => (props.active ? 'table-row' : 'none')};
`;

export const TableHeader = styled.th<{
  negativeValue?: boolean
  isDisplay?: boolean
}>`
    display: ${(props) => (props.isDisplay ? 'table-cell' : 'none')};
    min-height: 40px;
    height: 100%;
    vertical-align: top;
    font-weight: 500;
    font-size: 12px;
    padding: 4px;
    color: ${(props) => (props.negativeValue ? 'red' : '#aaabad')};
    white-space: nowrap;
    text-align: left;
    z-index: 5;
`;

export const TableData = styled.td<{
  isDisplay?: boolean
  backGroundMarker?: string
}>`
    display: ${(props) => (props.isDisplay ? 'table-cell' : 'none')};
    background-color: ${(props) => (props.backGroundMarker ? props.backGroundMarker : 'transparent')};
    height: 40px;
    min-width: 40px;
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

export const CustomTableData = styled(TableData)`
    width: 33%;
`;

export const AddButtonTableData = styled.td`
    height: 100%;
    gap: 4px;
    vertical-align: middle;
    padding: 8px;
    z-index: 5;
    right: 0;
    @media print {
        display: none;
    }
`;

export const TFootRow = styled.tr``;

export const EditFieldTableData = styled(TableData)`
    border-radius: 24px;
`;

export const EditFieldTableRow = styled.tr`
    position: relative;
    cursor: pointer;
    user-select: none;
    @media print {
        display: none;
    }
`;

export const ActionsCell = styled.td<{ expanded?: boolean }>`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    gap: 4px;
    height: 100%;
    visibility: hidden;
    position: absolute;
    vertical-align: top;
    padding: 8px;
    z-index: 5;
    right: 0;
    ${TableRow}:hover & {
        visibility: visible;
    }
`;
