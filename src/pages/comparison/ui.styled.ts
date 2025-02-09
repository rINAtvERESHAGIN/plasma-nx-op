import styled from '@emotion/styled';
import '@fontsource/geologica';
import { Dialog } from '@mui/material';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
  padding: 20px 40px;
  box-sizing: border-box;
  height: calc(100vh - 100px);
  & > div:nth-of-type(1) {
    height: 50px;
  }
  & > div:nth-of-type(3) {
    display: flex;
    flex-direction: row;
    height: 100%;
    gap: 20px;
    box-sizing: border-box;
  }
  & > div:nth-of-type(3) > div {
    width: 50%;
  }
  & > div:nth-of-type(3) > div:last-of-type {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & > div:nth-of-type(3) > div:last-of-type > div {
    height: 100%;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  gap: 20px;
  width: 100%;
  font-family: Geologica;
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
`;

export const ChartsContainer = styled.div``;

export const RightChartContainer = styled.div``;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-family: Geologica;
`;

export const Hint = styled.div`
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
  color: #24252980;
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
