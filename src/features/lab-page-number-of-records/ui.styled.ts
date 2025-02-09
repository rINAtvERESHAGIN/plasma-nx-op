import { styled } from 'styled-components';
import { type YearButtonProps } from './types';
import '@fontsource/geologica';
import { Dialog } from '@mui/material';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  width: 100%;
  height: 100%;
  & > div:nth-of-type(1) {
    width: 67%;
    min-height: calc(50vh - 140px);
  }

  & > div:nth-of-type(2) {
    width: 33%;
    min-height: calc(50vh - 140px);
  }
  & > div:first-of-type > div {
    height: 100%;
  }
  & > div:last-of-type > div {
    height: 100%;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  padding: 28px;
  gap: 20px;
  border-radius: 20px;
  background-color: #f3f5f6;
  opacity: 0px;
`;

export const WeeklyMeasurementContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const HeaderText = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50000px;
  padding: 5px 14px 5px 14px;
  gap: 10px;
  background-color: #ffffff;
`;

export const YearButton = styled.button<YearButtonProps>`
  border: none;
  border-bottom: ${(props) => (props.isActive ? '1px solid #47CBCA' : 'none')};
  background-color: #ffffff;
  color: ${(props) => (props.isActive ? '#242529' : '#24252980')};
  font-family: Geologica;
  font-size: ${(props) => (props.isActive ? '16px' : '14px')};
  font-weight: 400;
  line-height: 20px;
  &:hover {
    background-color: #ffffff;
    color: #242529;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-family: Geologica;
`;

export const ExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 80%;
    height: 75%;
    padding: 34px 40px;
    border-radius: 20px;
    background-color: #f3f5f6;
  }
`;
