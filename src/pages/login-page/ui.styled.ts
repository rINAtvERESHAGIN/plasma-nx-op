import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

export const StyledCenteredColumnBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 22%;
`;
export const StyledLoginFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    width: 100%;
`;
export const StyledLoginButton = styled(Button)`
    /* margin-top: 5px; */
`;

export const StyledErrorMessage = styled.div`
    color: red;
    /* margin-top: 5px; */
`;
