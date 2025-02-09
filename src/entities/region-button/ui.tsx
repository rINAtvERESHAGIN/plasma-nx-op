import React from 'react';
import Button from '@mui/material/Button';
// import { selectedRegion } from "@features/try-map/model/reducer-slice-geo-map";
import { setRegion } from '@shared/model/system-operator';
import { useAppDispatch } from '@app/store';
import bbox from '@turf/bbox';
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import { useRouteLoaderData } from 'react-router';
import { useRegionsCore } from '@app/core-data-slice/reducer';

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 10px;
  margin-left: calc(100vw / 90);
  transform: translateY(-50%);
  z-index: 1000;
`;

const CustomButton = styled(Button)`
  width: 10%;
  height: 10%;
  margin-bottom: 10px;
`;

const RegionButton = ({ mapRef }) => {
  const dispatch = useAppDispatch();
  const boundaries = useRouteLoaderData('main');
  const regions = useRegionsCore();

  const buttonsData = [
    { label: 'Нов', fullName: 'Новосибирск', regionCode: 'RU-NVS' },
    { label: 'Мск', fullName: 'Москва', regionCode: 'RU-MOW' },
    { label: 'Спб', fullName: 'Санкт-Петербург', regionCode: 'RU-SPE' },
    { label: 'Чел', fullName: 'Челябинск', regionCode: 'RU-CHE' },
    { label: 'Смр', fullName: 'Самара', regionCode: 'RU-SAM' },
    { label: 'Екб', fullName: 'Екатеринбург', regionCode: 'RU-SVE' },
    { label: 'Крр', fullName: 'Красноярск', regionCode: 'RU-KYA' },
    { label: 'Рст', fullName: 'Ростов-на-Дону', regionCode: 'RU-ROS' },
    { label: 'Крд', fullName: 'Краснодар', regionCode: 'RU-KDA' }
  ];

  const regionButtonClick = (regionCode: string) => {
    const selectedFeature = boundaries[3].features.find((feature) => feature.properties.code === regionCode);

    if (selectedFeature) {
      const selectedRegion = regions.data[selectedFeature.properties.code];
      dispatch(setRegion(selectedRegion));

      const [minLng, minLat, maxLng, maxLat] = bbox(selectedFeature);

      if (mapRef.current) {
        mapRef.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat]
          ],
          { padding: 40, duration: 1000, pitch: 15 }
        );
      }
    }
  };

  const handleButtonClick = (regionCode: string) => () => {
    regionButtonClick(regionCode);
  };

  return (
    <ButtonContainer>
      {buttonsData.map((button, index) => (
        <Tooltip placement="right-start" title={button.fullName} key={index}>
          <span>
            <CustomButton className="region-button" variant="contained" onClick={handleButtonClick(button.regionCode)}>
              {button.label}
            </CustomButton>
          </span>
        </Tooltip>
      ))}
    </ButtonContainer>
  );
};

export default RegionButton;
