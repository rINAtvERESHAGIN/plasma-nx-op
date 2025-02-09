import styled from 'styled-components';

export const Container = styled.div`
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
