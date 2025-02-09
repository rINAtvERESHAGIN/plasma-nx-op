import styled from '@emotion/styled';

export const CardContainer = styled.span`
position: relative;
display: flex;
justify-content: center;
align-items: center;
z-index: 0;
overflow: hidden;
width: 100%;
height: 100%;

& img {
    width: 50%;
    height: 50%;
    border-radius: 50%;
}

& svg {
    width: 60%;
    height: 60%;
    border-radius: 50%;
}
`;

