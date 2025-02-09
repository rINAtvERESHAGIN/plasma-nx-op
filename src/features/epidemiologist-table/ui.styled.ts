import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const TableFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background-color: transparent;
  padding-bottom: 24px;
`;

export const ChangesCellContainerSign = styled.span`
  color: #24252980;
  font-family: Geologica;
  font-size: 12px;
  font-weight: normal;
  line-height: 26px;
  text-align: left;
`;

export const ChangesCellContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 29% 50%;
  > :first-of-type {
    grid-column: span 2;
  }
  gap: 8px;
  column-gap: 0px;
`;

export const ShowingContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const TypeOfGrowthLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

export const WeeklyAvgSmoothedDeltaLabel = styled.span`
  font-family: Geologica;
  font-size: 14px;
  font-weight: 200;
  line-height: 26px;
  text-align: left;
  color: #242529;
`;

export const CellContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const InitInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.15fr);
  gap: 16px;
  > :nth-of-type(3) {
    grid-column: span 2;
  }
  column-gap: 8px;
  row-gap: 0px;
  height: calc(100% - 16px);
  grid-template-rows: repeat(2, 1fr);
  padding-top: 16px;
`;

export const LabelInitInfoParam = styled.span`
  font-family: Geologica;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #242529;
`;