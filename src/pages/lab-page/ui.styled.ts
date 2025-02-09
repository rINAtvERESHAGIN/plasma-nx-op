import styled from '@emotion/styled';
import '@fontsource/geologica';
import { Dialog } from '@mui/material';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0px 40px 0px 40px;
  box-sizing: border-box;
  height: calc(100vh - 100px);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

export const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  & > div:nth-of-type(1) {
    width: 50%;
    min-height: calc(50vh - 140px);
  }

  & > div:nth-of-type(2) {
    width: 50%;
    min-height: calc(50vh - 140px);
  }
  & > div:first-of-type > div {
    height: 100%;
  }
  & > div:last-of-type > div {
    height: 100%;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  padding: 14px 40px 14px 40px;
  width: 100%;
  border-radius: 14px;
  background-color: #f3f5f6;
  box-sizing: border-box;
  font-family: Geologica;
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  color: #242529;
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
