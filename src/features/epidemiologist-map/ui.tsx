import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer } from './ui.styled';
import Map, { Layer, Source } from 'react-map-gl';
import { borderLayer, dataLayer } from './utils/map-styles';
import { useRouteLoaderData } from 'react-router';
import { updatePercentiles, createMarkerFeatures, updateFeaturesWithMarkers } from './utils/utils';
import { MapTooltip } from '../../map-tooltip/ui';
import rgStat from './multi_led_for_map.json';
import anomalyArea from './images-of-areas/anomalyArea.png';
import markersData from './images-of-areas/region_markers.json';
import { initialViewState } from './constants';

const MAPBOX_TOKEN = 'pk.eyJ1IjoieW9reWhpIiwiYSI6ImNsanljaXRlbzA0NXczaG56ODQ4Nm1lZzQifQ.aq4SVmBndadu6TefM5-Clw';

export const EpidemiologistMap: React.FunctionComponent = () => {
  const mapRef = useRef(null);
  const boundaries = useRouteLoaderData('epidemiologist-review');
  const markers = markersData;
  const [hoverInfo, setHoverInfo] = useState<{ feature: any; x: number; y: number } | null>(null);

  // Hover c информацией о наведенных объектах на карте
  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y }
    } = event;
    const hoveredFeature = features?.[0];
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  // Используется для обновления состояния при наведении курсора на объекты карты
  useEffect(() => {
    if (hoverInfo != null && mapRef.current) {
      mapRef.current.getCanvas().style.cursor = 'pointer';
      mapRef.current.setFeatureState({ source: 'regions', id: hoverInfo.feature.id }, { hover: true });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.getCanvas().style.cursor = '';
        if (hoverInfo != null) {
          mapRef.current.removeFeatureState({ source: 'regions', id: hoverInfo.feature.id }, 'hover');
        }
      }
    };
  }, [hoverInfo]);

  const regionStatusMap = useMemo(() => {
    return rgStat.reduce((acc, curr) => {
      acc[curr.iso_code] = curr;
      return acc;
    }, {});
  }, [rgStat]);

  const data = useMemo(
    () => boundaries[3] && updatePercentiles(boundaries[3], (f) => f, regionStatusMap),
    [boundaries]
  );

  const dataWithMarkers = useMemo(
    () => updateFeaturesWithMarkers(boundaries[3], markers, regionStatusMap),
    [boundaries, markers, regionStatusMap]
  );

  const markerData = useMemo(() => createMarkerFeatures(dataWithMarkers), [dataWithMarkers]);

  const handleLoad = (): void => {
    const map = mapRef.current.getMap();

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
      <MapContainer id="MapContainer" className="map-container">
        <Map
          ref={mapRef}
          initialViewState={initialViewState}
          // mapStyle='mapbox://styles/yokyhi/clx4tax3r01ne01pcd8gtd52x'
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={['regions-fills', 'fill-extrusion']}
          onMouseMove={onHover}
          onLoad={handleLoad}
        >
          {/* обычная карта */}
          <Source type="geojson" data={data} id="regions">
            <Layer {...dataLayer} />
            <Layer {...borderLayer} />
          </Source>

          {/* Marker */}
          {/* <Source type='geojson' data={markerData} id='regions-marker'>
            <Layer {...markerLayer} />
          </Source>

          <Source type='geojson' data={smallRegions} id='city'>
            <Layer {...twoLayer} />
          </Source> */}
          <MapTooltip hoverInfo={hoverInfo} />
        </Map>
      </MapContainer>
    </>
  );
};
