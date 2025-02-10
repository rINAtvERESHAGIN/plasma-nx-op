import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 39px 96%;
    grid-template-rows: 39px 1fr;
    grid-gap: 8px;
    > :first-child {
        justify-self: flex-start;
        grid-column: 1/3;
        align-items: center;
    }
    margin-right: 20px;
    overflow: auto;
`;
export const TimelineContainer = styled.div`
    width: 100%;
    height: 100%;
    grid-column: 1/3;
    grid-row: 2/2;
`;
