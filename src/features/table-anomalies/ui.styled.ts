import styled from 'styled-components';

export const LabelInitInfoParam = styled.span`
  font-family: Geologica;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #242529;
`;

export const IconWithSignContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;
export const Sign = styled.span`
  font-family: Geologica;
  font-size: 14px;
  font-weight: 300;
  line-height: 17.5px;
  text-align: center;
`;

export const Cell = styled.div`
  display: flex;
`;
export const InitInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.15fr);
  gap: 16px;
  > :nth-of-type(3) {
    grid-column: span 2;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const TableFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const TableScrollableContainer = styled.div`
  overflow: scroll;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100%;
`;
