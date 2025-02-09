import Button from '@mui/material/Button';
import styled from 'styled-components';
import { type StyledButtonProps } from './ui';

export const StyledButton = styled(Button) <StyledButtonProps>`
    && {
        opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    }
`;
