import React, { useCallback, useEffect, useState } from 'react';
import {
  defaultDataUnrecognizedProfile,
  defaultDataDiseasesProfile,
  defaultDataWeekDiseasesProfile
} from './constants';
import { type PlotMouseEvent } from 'plotly.js';
import { isNil } from 'lodash';
import { MainContainer, HeaderContainer, LeftContainer, RightContainer } from './ui.styled';
import { ChartOfProcessorResult } from '@features/chart-of-processor-result/ui';
import { Card, CardHeader } from '@plasma/ui';
import InfoTooltip from '@entities/info-icon-with-tooltip/ui';
import { type ProcessorConfiguration } from '@shared/api/model/ProcessorConfiguration';
import { UnrecognizedProfileInfo, WeekDiseasesProfileInfo, DiseasesProfileInfo } from './block-description';

const BiochemicalProfiles: React.FunctionComponent = () => {
  const [dataUnrecognizedProfile, setDataUnrecognizedProfile] =
    useState<ProcessorConfiguration>(defaultDataUnrecognizedProfile);
  const [dataDiseasesProfile, setDataDiseasesProfile] = useState<ProcessorConfiguration>(defaultDataDiseasesProfile);
  const [dataWeekDiseasesProfile, setDataWeekDiseasesProfile] =
    useState<ProcessorConfiguration>(defaultDataWeekDiseasesProfile);
  const [selectedWeek, setSelectedWeek] = useState<string[] | null>(null);

  const handleUnrecognizedProfileClick = useCallback((event: Readonly<PlotMouseEvent>) => {
    const pointData = event.points[0];
    const { customdata } = pointData;

    if (Array.isArray(customdata) && customdata.length > 1) {
      const dateMin = customdata[0];
      const dateMax = customdata[1];
      setSelectedWeek([dateMin, dateMax]);
    }
  }, []);

  const updateAllDataSet = (dataSet: ProcessorConfiguration): ProcessorConfiguration => {
    return {
      ...dataSet,
      data: dataSet.data.map((item) => ({
        ...item,
        date_min: !isNil(selectedWeek) ? selectedWeek[0] : item.date_min,
        date_max: !isNil(selectedWeek) ? selectedWeek[1] : item.date_max
      }))
    };
  };

  useEffect(() => {
    if (!isNil(selectedWeek)) {
      setDataWeekDiseasesProfile(updateAllDataSet(defaultDataWeekDiseasesProfile));
    }
  }, [selectedWeek]);

  return (
    <MainContainer>
      <LeftContainer>
        <Card size="large">
          <CardHeader headerLeft={'Биохимические профили'} size="large" />
          <>Тут Будет Таблица</>
        </Card>
        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {WeekDiseasesProfileInfo.header}
                <InfoTooltip title={WeekDiseasesProfileInfo.description} />
              </HeaderContainer>
            }
            size="small"
          />
          <ChartOfProcessorResult processorConfig={dataWeekDiseasesProfile} />
        </Card>
      </LeftContainer>

      <RightContainer>
        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {UnrecognizedProfileInfo.header}
                <InfoTooltip title={UnrecognizedProfileInfo.description} />
              </HeaderContainer>
            }
            size="small"
          />
          <ChartOfProcessorResult
            processorConfig={dataUnrecognizedProfile}
            onClickHandler={handleUnrecognizedProfileClick}
          />
        </Card>

        <Card size="small">
          <CardHeader
            headerLeft={
              <HeaderContainer>
                {DiseasesProfileInfo.header}
                <InfoTooltip title={DiseasesProfileInfo.description} />
              </HeaderContainer>
            }
            size="small"
          />
          <ChartOfProcessorResult processorConfig={dataDiseasesProfile} />
        </Card>
      </RightContainer>
    </MainContainer>
  );
};
export default BiochemicalProfiles;
