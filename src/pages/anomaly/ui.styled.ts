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
    height: auto;
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

  & > div:last-of-type > div {
    height: calc(100vh - 160px);
    overflow-y: scroll;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
  padding: 5px 5px;
  gap: 10px;
  background-color: #f3f5f6;
`;

export const HeaderButton = styled.button<YearButtonProps>`
  border: none;
  background-color: #f3f5f6;
  border-bottom: ${(props) => (props.isActive ? '1px solid #47CBCA' : 'none')};
  color: ${(props) => (props.isActive ? '#242529' : '#24252980')};
  font-family: Geologica;
  font-size: ${(props) => (props.isActive ? '16px' : '14px')};
  font-weight: 400;
  line-height: 20px;
  &:hover {
    background-color: #f3f5f6;
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

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 80%;
    height: 75%;
    padding: 34px 40px;
    border-radius: 20px;
    background-color: #f3f5f6;
  }
`;

export const ExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
