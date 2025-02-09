import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
`;

export const ButtonGroupContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 5px 0px;
  box-sizing: border-box;
`;

export const TabContentContainer = styled.div`
  margin-top: 16px;
`;

export const RegionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  & > div:last-of-type {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 6px 4px;
    align-self: stretch;
    flex-wrap: wrap;
  }
`;
