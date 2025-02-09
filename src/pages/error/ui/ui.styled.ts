import styled from 'styled-components';

export const ErrorLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media print {
        display: none;
    }
`;
