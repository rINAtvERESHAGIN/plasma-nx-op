import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { setRegion, useOverviewInformation, useActiveDate } from '@shared/model/system-operator';
import { MapContainer } from '@features/mapbox/ui/ui.styled';
import Map, { Layer, Source } from 'react-map-gl';
import { useAppDispatch, useAppSelector } from '@app/store';
import GeoMapService from '@shared/api/services/GeoMapService';
import { updateDocument } from '@pages/root/model';
import { borderLayer, dataLayer, extrusionLayer, markerLayer, patternFillLayer } from '../map-style';
import { Try3d } from '@features/mapbox/try3d';
import type { MapLayerMouseEvent } from 'react-map-gl';
import ContextMenu from '@entities/map-context-menu/ui';
import bbox from '@turf/bbox';
import { useRouteLoaderData } from 'react-router';
import RegionButton from '@entities/region-button/ui.tsx';
import { useActiveLab } from '@shared/model/useActiveLab';
import { useActiveParameter } from '@shared/model/useActiveParameter';
import { useRegionsCore } from '@app/core-data-slice/reducer';
import hatchedArea from '../images-of-areas/hatchedArea.png';
import anomalyArea from '../images-of-areas/anomalyArea.png';
import markersData from '../images-of-areas/region_markers.json';
import { createMarkerFeatures, updateFeaturesWithMarkers, updatePercentiles } from '../utils/utils';

const MAPBOX_TOKEN = 'pk.eyJ1IjoieW9reWhpIiwiYSI6ImNsanljaXRlbzA0NXczaG56ODQ4Nm1lZzQifQ.aq4SVmBndadu6TefM5-Clw';

const MapBox: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef(null);
  const boundaries = useRouteLoaderData('main');
  const [hoverInfo, setHoverInfo] = useState<{ feature: any; x: number; y: number } | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);

  const lab = useActiveLab();
  const parameter = useActiveParameter();
  const overviewInformation = useOverviewInformation();
  const selectedDate = useActiveDate();
  const regions = useRegionsCore();

  const documentRegion = useAppSelector((state) => state.document.data.regions);
  const is3dLayerEnabled = useAppSelector((state) => state.ui.is3dLayerEnabled);
  const [selectedExtrusionFeatures, setSelectedExtrusionFeatures] = useState([]);
  const [isQKeyPressed, setIsQKeyPressed] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState<{ x: number; y: number } | null>(null);
  const [isContainerBlurred, setIsContainerBlurred] = useState(false);

  // Обработчики событий клавиатуры для выбора нескольких городов
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'q') {
      setIsQKeyPressed(true);
    }
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'q') {
      setIsQKeyPressed(false);
    }
  };

  // Подписка на события клавиатуры
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Hover c информацией о наведенных объектах на карте
  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y }
    } = event;
    const hoveredFeature = features?.[0];
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  // Контекстное меню, открывается правой кнопкой мыши
  // Предотвращение стандартного поведения браузера
  const onContextMenu = useCallback(
    (event): void => {
      event.preventDefault();
      const { features } = event;
      const selectedFeature = features?.[0];

      if (selectedFeature) {
        // Устанавливаем координаты контекстного меню на местоположение клика правой кнопкой мыши
        setContextMenuCoordinates({ x: event.point.x, y: event.point.y });
        setContextMenuOpen(true);

        mapRef.current.setFeatureState({ source: 'regions', id: selectedFeature.id }, { selected: true });

        if (selectedRegionId) {
          mapRef.current.removeFeatureState({ source: 'regions', id: selectedRegionId }, 'selected');
        }

        setSelectedRegionId(selectedFeature.id);
      }
    },
    [selectedRegionId]
  );
  // Функция используется для обработки события клика на элементы карты
  const onClick = useCallback(
    (event: MapLayerMouseEvent): void => {
      const { features } = event;
      const selectedFeature = features && features[0];
      if (selectedFeature.source === 'regions') {
        // Установка состояния выбранности объекта на карте
        mapRef.current.setFeatureState({ source: 'regions', id: selectedFeature.id }, { selected: true });
        mapRef.current.setFeatureState({ source: 'extrusion', id: selectedFeature.id }, { selected: true });

        if (selectedRegionId && selectedFeature.source === 'regions') {
          mapRef.current.removeFeatureState({ source: 'regions', id: selectedRegionId }, 'selected');
          selectedExtrusionFeatures.forEach((extrusionFeatureId) => {
            mapRef.current.removeFeatureState({ source: 'extrusion', id: extrusionFeatureId }, 'selected');
          });
          setSelectedExtrusionFeatures([]);
        } else if (selectedFeature.source === 'extrusion') {
          if (isQKeyPressed) {
            mapRef.current.removeFeatureState({ source: 'regions', id: selectedRegionId }, 'selected');
            setSelectedExtrusionFeatures((prevSelectedFeatures) => {
              if (!prevSelectedFeatures.includes(selectedFeature.id)) {
                return [...prevSelectedFeatures, selectedFeature.id];
              } else {
                mapRef.current.removeFeatureState(
                  {
                    source: 'extrusion',
                    id: selectedFeature.id
                  },
                  'selected'
                );
                return prevSelectedFeatures.filter((id) => id !== selectedFeature.id);
              }
            });
          } else {
            selectedExtrusionFeatures.forEach((extrusionFeatureId) => {
              mapRef.current.removeFeatureState(
                {
                  source: 'extrusion',
                  id: extrusionFeatureId
                },
                'selected'
              );
            });
            mapRef.current.removeFeatureState({ source: 'regions', id: selectedRegionId }, 'selected');
            setSelectedExtrusionFeatures([selectedFeature.id]);
          }
        }

        setSelectedRegionId(selectedFeature.id);
        const selectedRegion = regions.data[selectedFeature.properties.code];
        dispatch(setRegion(selectedRegion));
        // dispatch(setRegion(selectedFeature.properties));

        // Центрирование карты на выбранном регионе.
        if (selectedFeature && selectedFeature.source === 'regions') {
          const [minLng, minLat, maxLng, maxLat] = bbox(selectedFeature);

          mapRef.current.fitBounds(
            [
              [minLng, minLat],
              [maxLng, maxLat]
            ],
            { padding: 40, duration: 1000, pitch: 15 }
          );
        }
      }
    },
    [selectedRegionId, isQKeyPressed]
  );
  // Используется для обновления состояния при наведении курсора на объекты карты
  useEffect(() => {
    if (hoverInfo != null && mapRef.current) {
      mapRef.current.getCanvas().style.cursor = 'pointer';
      mapRef.current.setFeatureState({ source: 'regions', id: hoverInfo.feature.id }, { hover: true });
      mapRef.current.setFeatureState({ source: 'extrusion', id: hoverInfo.feature.id }, { hover: true });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.getCanvas().style.cursor = '';
        if (hoverInfo != null) {
          mapRef.current.removeFeatureState({ source: 'regions', id: hoverInfo.feature.id }, 'hover');
          mapRef.current.removeFeatureState({ source: 'extrusion', id: hoverInfo.feature.id }, 'hover');
        }
      }
    };
  }, [hoverInfo]);

  // Используется для загрузки данных о детекторах.
  useEffect((): void => {
    const fetchGeoMapDetectors = async (): Promise<void> => {
      const responseData = await GeoMapService.requestDetectorsBySelectedOption(
        lab.data,
        parameter.data,
        overviewInformation
      );
      dispatch(updateDocument({ regions: responseData }));
    };
    if (parameter.data && lab.data && overviewInformation) {
      fetchGeoMapDetectors().catch((e) => {
        console.error(e);
      });
    }
  }, [lab.data, parameter.data, overviewInformation]);

  // Возвращается статус региона, соответствующий выбранной дате
  const regionStatus = useMemo(() => {
    const date = selectedDate || undefined;
    if (documentRegion !== undefined) {
      return documentRegion[date];
    }
  }, [selectedDate]);

  const data = useMemo(() => boundaries[3] && updatePercentiles(boundaries[3], (f) => f, regionStatus), [boundaries]);

  const markers = useMemo(() => markersData, []);
  const dataWithMarkers = useMemo(
    () => updateFeaturesWithMarkers(boundaries[3], markers, regionStatus),
    [boundaries, markers, regionStatus]
  );
  const markerData = useMemo(() => createMarkerFeatures(dataWithMarkers), [dataWithMarkers]);

  const [dataMap, setDataMap] = useState(undefined);

  // Обновление данных карты в соответствии с изменениями в boundaries и regionStatus
  useEffect(() => {
    if (boundaries[3] && regionStatus) {
      setDataMap(updatePercentiles(boundaries[3], (f) => f, regionStatus));
    }
  }, [boundaries, selectedDate, regionStatus]);

  // Применяет эффект размытия карты в зависимости от ширины
  useEffect(() => {
    const applyBlurEffect = () => {
      const mapContainer = document.querySelector('.map-container');
      if (mapContainer) {
        const width = mapContainer.offsetWidth;
        const minWidthPercentage = 0.2;
        const minContainerWidth = window.innerWidth * minWidthPercentage;

        if (width < minContainerWidth) {
          const blurLevel = Math.min((minContainerWidth - width) / 10, 100);
          mapContainer.style.filter = `blur(${blurLevel}px)`;
          mapContainer.style.pointerEvents = 'none';
          setIsContainerBlurred(true);
        } else {
          mapContainer.style.filter = 'none';
          mapContainer.style.pointerEvents = 'auto';
          setIsContainerBlurred(false);
        }
      }
    };
    applyBlurEffect();
    window.addEventListener('resize', applyBlurEffect);

    return () => {
      window.removeEventListener('resize', applyBlurEffect);
    };
  }, []);

  const handleLoad = (): void => {
    const map = mapRef.current.getMap();

    map.loadImage(hatchedArea, (error: Error, image: HTMLImageElement) => {
      if (error !== null) {
        console.error('Error loading the hatched image:', error);
        return;
      }
      map.addImage('hatched-area', image);
    });

    map.loadImage(anomalyArea, (error: Error, image: HTMLImageElement) => {
      if (error !== null) {
        console.error('Error loading the anomaly image:', error);
        return;
      }
      map.addImage('anomaly-area', image);
    });
  };

  return (
    <>
      {isContainerBlurred && <RegionButton mapRef={mapRef} />}
      <MapContainer id="MapContainer" className="map-container">
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: 67.3091,
            longitude: 104.6349,
            zoom: 2.07,
            pitch: 15,
            maxPitch: 50,
            minZoom: 1.57,
            maxBounds: [
              [-20, -50],
              [220, 85]
            ]
          }}
          mapStyle="mapbox://styles/yokyhi/clx4tax3r01ne01pcd8gtd52x"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={['regions-fills', 'fill-extrusion']}
          onMouseMove={onHover}
          onClick={onClick}
          onContextMenu={onContextMenu}
          onLoad={handleLoad}
        >
          {hoverInfo != null && contextMenuOpen && (
            <ContextMenu
              open={contextMenuOpen}
              onClose={() => {
                setContextMenuOpen(false);
              }}
              anchorCoordinates={contextMenuCoordinates}
              regionId={hoverInfo.feature}
            >
              {hoverInfo.feature.properties.name}
            </ContextMenu>
          )}

          {/* обычная карта */}
          <Source type="geojson" data={dataMap ?? data} id="regions">
            <Layer {...dataLayer} type="fill" />
            <Layer {...patternFillLayer} />
            <Layer {...borderLayer} />
          </Source>

          {/* Marker */}
          <Source type="geojson" data={markerData} id="regions-marker">
            <Layer {...markerLayer} />
          </Source>

          {/* 3d карта */}
          <Source type="geojson" data={Try3d} id="extrusion" key={is3dLayerEnabled}>
            {is3dLayerEnabled && <Layer {...extrusionLayer} />}
          </Source>

          {hoverInfo != null && !contextMenuOpen && (
            <div
              className="tooltip"
              style={{
                position: 'absolute',
                zIndex: 1000,
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ccc',
                borderRadius: '2px',
                padding: '5px',
                left: hoverInfo.x,
                top: hoverInfo.y - 30,
                pointerEvents: 'none',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div>
                {hoverInfo.feature.properties.name}:{hoverInfo.feature.id}
              </div>
            </div>
          )}
        </Map>
      </MapContainer>
    </>
  );
};

export default MapBox;
