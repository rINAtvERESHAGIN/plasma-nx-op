import { Box, CssBaseline, IconButton, Toolbar, Typography, Tooltip, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Drawer, DrawerHeader, DrawerToolBar } from './ui.mui.styled';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavPanelLink } from '@widgets/navbar/ui';
import MapIcon from '@mui/icons-material/Map';
import { ListUl, ListUlItem } from './ui.styled';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import SubjectIcon from '@mui/icons-material/Subject';
import SchemaTwoToneIcon from '@mui/icons-material/SchemaTwoTone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@org/store-redux';
import GeoMapService from '@shared/api/services/GeoMapService';
import { updateDocument } from '@pages/root/model';
import { OutletContainer } from '@pages/root/ui.styled';
import LoadingScreen from '@entities/loading-screen/ui';
import { styled as muiStyled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export type LevelClosing = 'total' | 'part' | 'open';

const Puller = muiStyled('div', { shouldForwardProp: (prop) => prop !== 'openLevel' })<{ openLevel: LevelClosing }>(
  ({ theme, openLevel }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: '50%',
    right: '-8px',
    transform: 'rotate(90deg)',
    '&:hover': {
      backgroundColor: grey[600],
      cursor: 'pointer'
    },
    visibility: openLevel === 'total' ? 'visible' : 'hidden'
  })
);

const MainPageRoot = (): React.ReactNode => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [open, setOpen] = React.useState(false);
  const [totalClosed, setTotalClosed] = useState<LevelClosing>('part');
  const [showTools, setShowTools] = useState(false);

  const onTotalClosedClick = useCallback(() => {
    setTotalClosed('total');
  }, []);

  const onMouseEnterDrawer = useCallback((): void => {
    setShowTools(true);
  }, []);

  const onMouseLeaveDrawer = useCallback((): void => {
    setShowTools(false);
  }, []);

  const handleDrawerOpen = useCallback((): void => {
    setTotalClosed('open');
  }, []);

  const handleDrawerClose = useCallback((): void => {
    setTotalClosed('part');
  }, []);

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" openLevel={totalClosed}>
        <Toolbar sx={{ height: '100%' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            НИИ СБМ
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        totalClosed={totalClosed}
        open={open}
        onMouseEnter={onMouseEnterDrawer}
        onMouseLeave={onMouseLeaveDrawer}
      >
        <DrawerHeader>
          {open && (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          )}
        </DrawerHeader>
        <DrawerToolBar show={showTools} openLevel={totalClosed}>
          <IconButton onClick={onTotalClosedClick}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerToolBar>
        <ListUl id="ListUl" openLevel={totalClosed}>
          {/* nav */}
          <ListUlItem>
            <Tooltip placement="right-start" title="Карта">
              <NavPanelLink to="/main">
                <MapIcon sx={{ fontSize: 30, color: '#1976d2' }} />
              </NavPanelLink>
            </Tooltip>
          </ListUlItem>
          <ListUlItem>
            <Tooltip placement="right-start" title="Обзор">
              <NavPanelLink to="/review">
                <RemoveRedEyeIcon sx={{ fontSize: 30, color: '#1976d2' }} />
              </NavPanelLink>
            </Tooltip>
          </ListUlItem>
          <ListUlItem>
            <Tooltip placement="right-start" title="Сравнение">
              <NavPanelLink to="/comparison">
                <SsidChartIcon sx={{ fontSize: 30, color: '#1976d2' }} />
              </NavPanelLink>
            </Tooltip>
          </ListUlItem>
          <ListUlItem>
            <Tooltip placement="right-start" title="Блокнот">
              <NavPanelLink to="/blocknote">
                <SubjectIcon sx={{ fontSize: 30, color: '#1976d2' }} />
              </NavPanelLink>
            </Tooltip>
          </ListUlItem>
          <ListUlItem>
            <Tooltip placement="right-start" title="Result flow">
              <NavPanelLink to="/result-flow">
                <SchemaTwoToneIcon sx={{ fontSize: 30, color: '#1976d2', transform: 'rotate(270deg)' }} />
              </NavPanelLink>
            </Tooltip>
          </ListUlItem>
        </ListUl>
        <DrawerHeader>
          <ListUl id="ListUl_Bottom" openLevel={totalClosed}>
            <ListUlItem>
              <Tooltip placement="right-start" title="Личный кабинет">
                <NavPanelLink to="/personal-account">
                  <AccountBoxIcon sx={{ fontSize: 30, color: '#1976d2' }} />
                </NavPanelLink>
              </Tooltip>
            </ListUlItem>
          </ListUl>
        </DrawerHeader>
        <Puller onClick={handleDrawerClose} openLevel={totalClosed} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, paddingTop: '97px', background: '#fffeff', overflow: 'hidden' }}>
        {loading ? <LoadingScreen /> : null}
        <OutletContainer>{regionData ? <Outlet /> : null}</OutletContainer>
      </Box>
    </Box>
  );
};

export default MainPageRoot;
