import styled from 'styled-components';
export { BLOCKNOTES_FEATURE_KEY, blocknotesReducer } from './blocknote.slice';

const StyledBlocknote = styled.div`
  color: pink;
`;
export function Blocknote() {
  return (
    <StyledBlocknote>
      <h1>Welcome to Blocknote!</h1>
    </StyledBlocknote>
  );
}

export default Blocknote;
