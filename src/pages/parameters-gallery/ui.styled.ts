import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Container = styled(Grid)`
    padding: 20px;
`;

export const CategoryHeader = styled(Typography)`
    padding: 20px;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
`;
