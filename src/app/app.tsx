import styled from 'styled-components';
import NxWelcome from './nx-welcome';
import {Blocknote} from '@org/blocknote';

const StyledApp = styled.div`
  // Your style here
`;

if (import.meta.env.MODE === 'development')
  document.title = `[dev] ${document.title}`;
export function App() {
  return (
    <StyledApp>
      ASDFASDF
      <Blocknote />
    </StyledApp>
  );
}

export default App;
