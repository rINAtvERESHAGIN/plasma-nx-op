import { BlockNoteView } from '@blocknote/mantine';
import styled from 'styled-components';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { useAppSelector } from 'store-plasma';


const StyledBlocknote = styled.div`
  height: 100vh;
  background-color: #fff;
`;
export function Blocknote() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  const data = useAppSelector((state) => state.blocknotes.loadingStatus);

  // Renders the editor instance using a React component.
  return (
    <StyledBlocknote>
      {data}
      <BlockNoteView editor={editor} />
    </StyledBlocknote>
  );
}
