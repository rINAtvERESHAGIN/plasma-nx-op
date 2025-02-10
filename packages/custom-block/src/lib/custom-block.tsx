import styled from 'styled-components';

const StyledCustomBlock = styled.div`
  color: pink;
`;
export function CustomBlock() {
  return (
    <StyledCustomBlock>
      <h1>Welcome to CustomBlock!</h1>
    </StyledCustomBlock>
  );
}

export default CustomBlock;
