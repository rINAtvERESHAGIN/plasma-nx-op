import styled  from 'styled-components';

export const StepperContainer = styled.div<{ isDisplay: boolean }>`
  display: ${(props) => (props.isDisplay ? 'block' : 'none')};
`;

export const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  gap:32px
`;
