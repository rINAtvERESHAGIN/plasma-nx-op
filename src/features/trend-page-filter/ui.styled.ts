import styled from 'styled-components';
import '@fontsource/geologica';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f3f5f6;
  border-radius: 20px;
  padding: 25px;
  box-sizing: border-box;
  & > form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  & > form > :first-of-type {
    display: flex;
    flex-direction: row;
    gap: 18px;
  }

  & > form > :first-of-type > div {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  & > form > :first-of-type > div > div {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px dashed #24252933;
    border-radius: 14px;
    box-sizing: border-box;
  }
  & > form > :last-of-type {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
  }
`;

export const StyledButton = styled.button`
  width: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  gap: 10px;
  color: #ffffff;
  border-radius: 10px;
  background-color: #414961;
  border: none;
  cursor: pointer;
  font-family: Geologica;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  &:hover {
    background-color: #47cbca;
  }

  &:disabled {
    background-color: rgba(36, 37, 41, 0.5);
  }
`;

export const Title = styled.span`
  font-family: Geologica;
  font-size: 14px;
  line-height: 20px;
  color: #24252980;
`;

export const Label = styled.span`
  font-family: Geologica;
  font-size: 14px;
  line-height: 20px;
  color: #24252980;
`;

export const LabeledAutocomplete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
