import styled from 'styled-components';
import '@fontsource/geologica';

export const StyledButton = styled.button<{ $isActive: boolean }>`
  border: none;
  border-bottom: ${({ $isActive }) => ($isActive ? '1px solid #47CBCA' : 'none')};
  padding: 0;
  background-color: transparent;
  font-family: Geologica;
  color: ${({ $isActive }) => ($isActive ? '#242529' : '#24252980')};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    color: #47cbca;
  }
`;
