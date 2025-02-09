import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
  HeaderSignature,
  Container,
  HeaderContainer,
  LogoContainer,
  OutletContainer,
  StyledLink,
  LoadingScreenContainer
} from '@pages/root/ui.styled';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@widgets/navbar/ui';
import GeoMapService from '@shared/api/services/GeoMapService';
import { updateDocument } from '@pages/root/model';
import LoadingScreen from '../../entities/loading-screen/ui';
import { isNil } from 'lodash';
import { AppLogo } from '@shared/assets/images/app-logo/AppLogo';
import { AppTitle } from '@shared/assets/images/app-title/AppLogo';

const PLASMA_VERSION_APP = process.env.PLASMA_VERSION_APP;

export const Root = (): React.ReactNode => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const regionData = useAppSelector((state) => state.document.data);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (pathname === '/') {
        navigate('main');
      }
    }
  }, [pathname]);

  React.useEffect(() => {
    if (pathname === '/main') {
      setLoading(true);
      const fetchGeoMapDetectors = async () => {
        try {
          const responseData = await GeoMapService.requestDetectorsBySelectedOption(8, 9, 'detector');
          dispatch(updateDocument({ regions: responseData }));
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      fetchGeoMapDetectors();
    }
  }, [pathname]);

  return (
    <Container>
      <HeaderContainer>
        <LogoContainer>
          <StyledLink to="/mapbox">
            <AppLogo />
          </StyledLink>
          <HeaderSignature>
            <AppTitle />
            <span>version {PLASMA_VERSION_APP}</span>
          </HeaderSignature>
        </LogoContainer>

        {pathname !== '/login-page' && <Navbar />}
      </HeaderContainer>

      <LoadingScreenContainer component="main">
        {loading ? <LoadingScreen /> : null}
        <OutletContainer>{!isNil(regionData) ? <Outlet /> : null}</OutletContainer>
      </LoadingScreenContainer>
    </Container>
  );
};
