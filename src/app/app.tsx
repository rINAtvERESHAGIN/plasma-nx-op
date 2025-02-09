import styled from 'styled-components';
import NxWelcome from './nx-welcome';
import { Blocknote } from '@org/blocknote';

const StyledApp = styled.div`
  // Your style here
`;

console.log('process.env.NODE_END', process.env.NODE_END);
// if(process.env.NODE_END === 'development') document.title = `[dev] ${document.title}`
export function App() {
  return (
    <StyledApp>
      asdfasdf
      <Blocknote />
    </StyledApp>
  );
}

export default App;
