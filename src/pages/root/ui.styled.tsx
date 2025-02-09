import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Toolbar, Box } from '@mui/material';
import '@fontsource/geologica';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 100%;
  padding: 36px 40px;
  background-color: #fbfbfb;
  box-sizing: border-box;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CustomToolBar = styled(Toolbar)`
  height: 127px;
  background-color: #fafbfc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 0 !important;
`;

export const HeaderSignature = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  & > span:last-of-type {
    font-family: Geologica;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    color: #24252980;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
export const OutletContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const LoadingScreenContainer = styled(Box)`
  flex-grow: 1;
  background: #fffeff;
  overflow: hidden;
`;
