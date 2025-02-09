import styled from '@emotion/styled';
import '@fontsource/geologica';
import { Dialog } from '@mui/material';

export interface YearButtonProps {
  isActive: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  gap: 20px;
  display: flex;
  flex-direction: row;
  padding: 18px 40px 40px 40px;
  box-sizing: border-box;
  font-family: Geologica;
  & > div {
    width: 50%;
  }

  & > div:first-of-type {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 160px);
    gap: 20px;
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 20px;
  }

  & > div > div {
    background-color: #f3f5f6;
    width: 100%;
    border-radius: 20px;
  }

  & > div:first-of-type > div {
    height: 100%;
  }

  & > div:first-of-type > div:last-of-type > div {
    background-color: #e0f1f1;
  }

  & > div:last-of-type > div {
    height: calc(100vh - 160px);
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-family: Geologica;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
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
