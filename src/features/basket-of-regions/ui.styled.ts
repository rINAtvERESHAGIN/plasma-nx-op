import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

export const StyledButton = styled(Button)`
    align-items: center;
    justify-content: center;
`;

export const RegionCounter = styled(Typography)`
`;

export const StyledDrawer = styled(Drawer)`
    z-index: 3000;
`;

export const StyledDrawerBox = styled(Box)`
    width: 350px;
`;

export const DrawerTitle = styled(Typography)`
    text-align: center;
    margin-top: 2px;
    margin-bottom: 2px;
`;

export const ButtonBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    padding: 0 16px;
`;
