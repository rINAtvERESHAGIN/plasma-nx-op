import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

export const CustomIconButton = styled(Button)`
    position: absolute;
    right: 8px;
    top: 8px;
    color: ${({ theme }) => theme.palette.grey[500]};
`;

export const CustomDialog = styled(Dialog)`
    & .MuiDialog-paper {
        width: 37%;
        padding-left: 15px;
        padding-right: 15px;
    }
    & .MuiDialogContent-root {
        padding: ${({ theme }) => theme.spacing(2)};
    }
    & .MuiDialogActions-root {
        padding: ${({ theme }) => theme.spacing(1)};
    }
`;
