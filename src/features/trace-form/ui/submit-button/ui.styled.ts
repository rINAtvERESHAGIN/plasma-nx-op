import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const dynamicStyles = () => css`
    @keyframes shake {
        10%,
        90% {
            transform: translate3d(-1px, 0, 0);
        }
        20%,
        80% {
            transform: translate3d(2px, 0, 0);
        }
        30%,
        50%,
        70% {
            transform: translate3d(-4px, 0, 0);
        }
        40%,
        60% {
            transform: translate3d(4px, 0, 0);
        }
    }
`;

export const DatasetSpecificationSubmitButtonStyled = styled(Button)`
    ${dynamicStyles}
`;
