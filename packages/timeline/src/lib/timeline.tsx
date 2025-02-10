import styled from 'styled-components';
export * from '../shared';

const StyledTimeline = styled.div`
  color: pink;
`;
export function Timeline() {
  return (
    <StyledTimeline>
      <h1>Welcome to Timeline!</h1>
    </StyledTimeline>
  );
}

export default Timeline;
