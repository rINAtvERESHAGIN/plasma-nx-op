import styled  from 'styled-components';
import '@fontsource/geologica';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 18px 40px 40px 40px;
  box-sizing: border-box;
  height: calc(100vh - 100px);
  & > div {
    width: 50%;
  }
  & > div:first-of-type {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & > div:first-of-type > div:first-of-type {
    height: 70%;
  }
  & > div:first-of-type > div:last-of-type {
    height: 30%;
  }
  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & > div:last-of-type > div {
    height: 100%;
  }
`;

export const LeftContainer = styled.div``;
export const RightContainer = styled.div``;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
