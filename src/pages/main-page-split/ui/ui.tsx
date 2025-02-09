import React, { useEffect, useMemo, useState } from 'react';
import { type IRegionData } from '@shared/api/yuh-client-api/models/RegionData.ts';
import { useAppDispatch, useAppSelector } from '@app/store.ts';
import { Typography } from '@mui/material';
import ChartAgeValueRelationship from '@features/chart-age-value-relationship/ui.tsx';
import ChartWeekValueRelationship from '@features/chart-week-value-relationship/ui.tsx';
import ChartStlDecompose from '@features/chart-stl-decompose/ui.tsx';
import { StatsAgeSexPyramidPlotly } from '@features/stats-age-sex-pyramid/ui.tsx';
import StatsPopulationPlotly from '@features/stats-population/ui.tsx';
import StatsBirthsDeathsPlotly from '@features/stats-births-deaths/ui.tsx';
import StatsCoronaPlotly from '@features/stats-corona/ui.tsx';
import '@shared/styles/scroll.css';
import CustomEditor from '@features/draft-split-central-panel-editor/ui';
import {
  CloseButton,
  MainContainer,
  PlotlyContainer,
  SettingsContainer,
  PanelHeaderContainer,
  TimeLineBox
} from '@pages/main-page-split/ui/ui.styled';
import MapBox from '@features/mapbox/ui/ui.tsx';
import WidgetTabs from '@widgets/tabs/ui.tsx';
import ReflexControlsDemo from '@features/split-container/ReflexControlsDemo.tsx';
import RegionService from '@shared/api/services/RegionService.ts';
import { setRegions } from '@shared/model/regions.ts';
import { animated, useSpring } from 'react-spring';
import SwitchButton from '@shared/ui/switch/ui.tsx';
import GlobalCohortSettings from '@features/global-cohort-settings/ui';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setOpenSettings, setOpenTimeLine, set3dLayerEnabled } from '@pages/main-page-split/model';
import Divider from '@mui/material/Divider';
import SettingsDock from '@features/main-page-settings-dock/ui';
import { useActiveRegion } from '@shared/model/useActiveRegion';
import { useActiveParameter } from '@shared/model/useActiveParameter';
import { useParametersCore } from '@app/core-data-slice/reducer';
import TimelineTools from 'timeline/features/timeline-tools/timeline-tools.ui';
import WordStat from '@features/plotly-wordstat/ui/ui';

const SettingsContainerAnimated = animated(SettingsContainer);

const SplitMainPage = (): React.ReactNode => {
  const data = useAppSelector((state) => state.document.data);
  const dispatch = useAppDispatch();
  const parameters = useParametersCore();
  const parameterActive = useActiveParameter();
  const regionActive = useActiveRegion();

  const [selectedParameterName, setSelectedParameterName] = useState('');

  const openTimeLine = useAppSelector((state) => state.ui.openTimeLine);
  const openSettings = useAppSelector((state) => state.ui.openSettings);
  const is3dLayerEnabled = useAppSelector((state) => state.ui.is3dLayerEnabled);

  const handleToggle3dLayer = () => {
    dispatch(set3dLayerEnabled(!is3dLayerEnabled));
  };

  // Выбранный параметр
  useEffect(() => {
    if (parameters?.data !== undefined) {
      const selectedParam = parameters.data.find((parameter) => parameter.id === parseInt(parameterActive.data));
      if (selectedParam) {
        setSelectedParameterName(selectedParam.name_ru);
      }
    }
  }, [parameterActive]);

  const tabs = [
    {
      label: 'Обстановка',
      content: (
        <>
          {' '}
          <ChartStlDecompose /> <ChartWeekValueRelationship /> <ChartAgeValueRelationship />{' '}
        </>
      )
    },
    {
      label: 'Редактор',
      content: (
        <>
          <CustomEditor />{' '}
        </>
      )
    }
  ];

  const settingsContainerAnimation = useSpring({
    height: openSettings ? '345px' : '170px',
    transform: openTimeLine || openSettings ? 'translateY(0%)' : 'translateY(100%)'
    // immediate: !openSettings,
  });

  const regionData = useMemo<IRegionData>(() => {
    if (data.regions) {
      return data.regions;
    }
    return {};
  }, [data.regions]);

  React.useEffect(() => {
    const fetchRegions = async () => {
      const regions = await RegionService.requestGetAllRegions();
      dispatch(setRegions(regions));
    };
    fetchRegions().catch((e) => {
      console.error(e);
    });
  }, []);

  const [width, setWidth] = useState('100%');
  const widthMapValue = '100%';
  const [widthMap, setWidthMap] = useState(widthMapValue);

  const onClick = (): void => {
    setWidth(width === 0 ? '25%' : 0);
    // window.dispatchEvent(new Event('resize'))
  };

  const styl = {
    width: width === 0 ? 0 : '100%',
    height: '100%',
    overflow: 'scroll',
    minWidth: '100%'
  };

  useEffect((): void => {
    setTimeout((): void => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }, [widthMap, width]);

  const onClickMap = (): void => {
    setWidthMap(widthMap === 0 ? widthMapValue : 0);
    // window.dispatchEvent(new Event('resize'))
  };

  const stylMap = {
    width: widthMap === 0 ? 0 : widthMapValue,
    height: '100%',
    overflow: 'scroll',
    minWidth: 0
  };

  const handleCloseSettings = () => {
    dispatch(setOpenSettings(false));
    dispatch(setOpenTimeLine(false));
  };

  return (
    <MainContainer id="MainContainer">
      <ReflexControlsDemo
        map={<MapBox regions={regionData} />}
        blocknote={
          <WidgetTabs
            tabs={tabs}
            onLeftButtonClick={onClickMap}
            onRightButtonClick={onClick}
            isLeftButtonVisible={widthMap === 0}
            isRightButtonVisible={width === 0}
          >
            <Divider />
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              {regionActive.data.name_ru ? `${regionActive.data.name_ru}, ` : null}
              {selectedParameterName}
            </Typography>
          </WidgetTabs>
        }
        charts={
          <PlotlyContainer style={styl} className="scroll-container">
            <PanelHeaderContainer>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                {regionActive.data.name_ru || 'Выберите регион'}
              </Typography>
              <Divider />
            </PanelHeaderContainer>
            <PlotlyContainer>
              <WordStat />
            </PlotlyContainer>
            <PlotlyContainer>
              <StatsAgeSexPyramidPlotly />
            </PlotlyContainer>
            <PlotlyContainer>
              <StatsBirthsDeathsPlotly />
            </PlotlyContainer>
            <PlotlyContainer>
              <StatsCoronaPlotly />
            </PlotlyContainer>
            <PlotlyContainer>
              <StatsPopulationPlotly />
            </PlotlyContainer>
          </PlotlyContainer>
        }
      />
      <SettingsDock />
      {(openTimeLine || openSettings) && (
        <SettingsContainerAnimated id="SettingsContainerAnimated" style={settingsContainerAnimation}>
          {openSettings && (
            <>
              <SwitchButton label="Данные о городах:" checked={is3dLayerEnabled} onChange={handleToggle3dLayer} />
              <GlobalCohortSettings />
            </>
          )}
          {openTimeLine && (
            <TimeLineBox>
              {data?.timeline ? <TimelineTools dataTimeline={data.timeline} /> : <div>No timeline data available</div>}
            </TimeLineBox>
          )}
          {openTimeLine || openSettings ? (
            <CloseButton onClick={handleCloseSettings}>
              <ExpandMoreIcon />
            </CloseButton>
          ) : null}
        </SettingsContainerAnimated>
      )}
    </MainContainer>
  );
};

export default SplitMainPage;
