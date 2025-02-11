import styled  from 'styled-components';
import '@fontsource/geologica/400.css';
import '@fontsource/geologica/300.css';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 20px;
  padding: 28px;
  border-radius: 20px;
  background: #f3f5f6;
  font-family: 'Geologica';
  box-sizing: border-box;
  overflow: auto;
  position: relative;
  & > span:first-of-type {
    align-items: center;
    font-size: 16px;
    line-height: 24px;
  }
`;
export const ContainerHeader = styled.span``;

export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  overflow-y: auto;
`;

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 18px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 20px;
  border: 3px solid #b0c4c9;
  background: #f3f5f6;
  box-sizing: border-box;
  &:hover {
    border: 2px solid #47cbca;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  color: #242529;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 6px;
`;

export const BlurOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 587px;
  height: 66px;
  background: linear-gradient(0deg, #f3f5f6 34.85%, rgba(243, 245, 246, 0) 100%);
`;
