import styled from '@emotion/styled';
import { CardActions, CardContent } from '@mui/material';

export const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    row-gap: 8px;
    flex-direction: column;
    padding-bottom: 16px;
    overflow: auto;
    margin-top: 15%;
    margin-bottom: 10%;
`;

export const AdditionCardActionStyled = styled(CardActions)`
    padding: 16px;
    position: absolute;
    bottom: 0;
    z-index: 500;
    background-color: #fff;
    width: 100%;
    padding-top: 0;
    height: 5%;
    padding-bottom: 0;
`;

export const AdditionCardContent = styled(CardContent)`
    height: 100%;
    overflow: auto;
`;
