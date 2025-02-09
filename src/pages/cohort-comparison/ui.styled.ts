import styled from '@emotion/styled';
import '@fontsource/geologica';
import { Dialog } from '@mui/material';

export interface YearButtonProps {
  isActive: boolean;
}

export const MainContainer = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  padding: 20px 40px 40px 40px;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  box-sizing: border-box;
  & > div:nth-of-type(1) {
    width: 541px;
  }
  & > div:nth-of-type(2) {
    width: 587px;
    height: 100%;
  }
  & > div:nth-of-type(3) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
    width: 100%;
    height: 100%;
  }
  & > div:nth-of-type(3) > div {
    width: 100%;
    height: 50%;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-family: 'Geologica';
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
