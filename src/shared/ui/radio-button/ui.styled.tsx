import styled from 'styled-components';

export const StyledRadioButton = styled.div<{ $selected: boolean; $disabled: boolean }>`
  cursor: pointer;
  border: ${({ $selected }) => ($selected ? '2px solid #414961' : '2px solid #24252933')};
  border-radius: 500px;
  &:hover {
    border-color: #47cbca;
  }
`;
