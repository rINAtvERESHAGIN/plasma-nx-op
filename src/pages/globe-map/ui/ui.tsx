import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import type { Map as MapboxMap } from 'mapbox-gl';
import { ContentContainer, MapContainer, RootMapContainer, Navbar, NavbarTitle } from './ui.styled';
import { ThreeDimensionalGeoJson } from '../data/3d-geojson';
import { GeoJson } from '../data/GeoJson';
import { locations } from './locations';
import { targetCoordinates } from './constants';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2V5MTQ4OCIsImEiOiJja3o3Mmd0Z2YwMDNpMm9ycHNxMTRrZWdqIn0.crpxKib-VbsSIvR4fgyW7g';

export const GlobeMapBox = (): React.ReactNode => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState<MapboxMap | null>(null);
  const refs = useRef(locations.map(() => React.createRef<HTMLDivElement>()));
  const [isSpinning, setIsSpinning] = useState(true);
  const [startLocationZoomLevel, setStartLocationZoomLevel] = useState(locations[0].zoom);
  const [zoomDirection, setZoomDirection] = useState('in');
  const [rotationDirection, setRotationDirection] = useState(1); // 1 для вращения вправо, -1 для вращения влево
  const [targetIndex, setTargetIndex] = useState(0);

  useEffect(() => {
    if (mapContainer.current !== null && map === null) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        projection: 'globe',
        center: locations[0].coords,
        zoom: locations[0].zoom,
        interactive: false
      });

      newMap.on('load', () => {
        setMap(newMap);
        setupMapLayers(newMap);
      });
      newMap.on('error', (e) => {
        console.error('Map error:', e);
      });
    }
  }, [mapContainer, map]);

  // Функция для добавления слоев глобуса.
  const setupMapLayers = (currentMap): void => {
    currentMap.addSource('extrusion', {
      type: 'geojson',
      data: ThreeDimensionalGeoJson
    });

    currentMap.addLayer({
      id: 'fill-extrusion',
      type: 'fill-extrusion',
      source: 'extrusion',
      layout: {},
      paint: {
        'fill-extrusion-color': '#01AEAD',
        'fill-extrusion-height': ['get', 'height'],
        'fill-extrusion-base': ['get', 'base_height'],
        'fill-extrusion-opacity': 0.9
      }
    });

    currentMap.addSource('regions', {
      type: 'geojson',
      data: GeoJson
    });

    currentMap.addLayer({
      id: 'regions-fills',
      type: 'fill',
      source: 'regions',
      layout: {},
      paint: {
        'fill-color': '#627BC1',
        'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.2, 0.1]
      }
    });

    currentMap.addLayer({
      id: 'regions-borders',
      type: 'line',
      source: 'regions',
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 1
      }
    });
  };

  // Вращение и zoom глобуса.
  const spinGlobe = (): void => {
    if (isSpinning && map !== null) {
      const distancePerSecond = 360 / 10;

      const center = map.getCenter();
      center.lng += (distancePerSecond / 100) * rotationDirection;

      const newZoomLevel = zoomDirection === 'in' ? startLocationZoomLevel + 0.01 : startLocationZoomLevel - 0.01;
      if (newZoomLevel >= 4) {
        setZoomDirection('out');
      } else if (newZoomLevel <= 3) {
        setZoomDirection('in');
      }

      setStartLocationZoomLevel(newZoomLevel);

      if (Math.abs(center.lng - targetCoordinates[targetIndex][0]) < 1) {
        setRotationDirection(rotationDirection * -1);
        setTargetIndex((targetIndex + 1) % targetCoordinates.length);
      }

      map.easeTo({
        center,
        zoom: newZoomLevel,
        duration: 100,
        easing: (n) => n
      });
    }
  };

  useEffect(() => {
    const spinInterval = isSpinning ? setInterval(spinGlobe, 100) : null;

    return () => {
      if (spinInterval !== null) clearInterval(spinInterval);
    };
  }, [isSpinning, map, startLocationZoomLevel, zoomDirection, rotationDirection, targetIndex]);

  useEffect(() => {
    const currentRefs = refs.current;

    const observers = locations.map((location, index) => {
      const ref = currentRefs[index];
      if (ref.current !== null) {
        // Создаем нового наблюдателя
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && map !== null) {
              // Когда элемент пересекает порог видимости, перемещаем карту к координатам элемента
              map.flyTo({
                center: location.coords,
                zoom: location.zoom,
                essential: true
              });

              // Если виден элемент с id: 1 или с id: 6, запускаем вращение глобуса
              if (location.id === 1 || location.id === 6) {
                setIsSpinning(true);
              }
            } else if (location.id === 1) {
              // Если элемент с id: 1 не виден, останавливаем вращение глобуса
              setIsSpinning(false);
              setStartLocationZoomLevel(locations[0].zoom);
            } else if (location.id === 6) {
              // Если элемент с id: 6 не виден, останавливаем вращение глобуса
              setIsSpinning(false);
              setStartLocationZoomLevel(locations[0].zoom);
            }
          },
          { threshold: 0.5 } // Порог видимости элемента
        );

        observer.observe(ref.current);
        return observer;
      }
      return null;
    });

    return () => {
      observers.forEach((observer, index) => {
        const ref = currentRefs[index];
        if (observer !== null && ref.current !== null) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [map]);

  return (
    <RootMapContainer>
      <Navbar>
        <NavbarTitle>НИИ СБМ</NavbarTitle>
      </Navbar>
      <MapContainer ref={mapContainer} />
      <ContentContainer>
        {locations.map((location, index) => (
          <div
            style={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
              // border: '1px solid white',
            }}
            key={location.id}
            ref={refs.current[index]}
          >
            <p>{location.text}</p>
            <>{location.component}</>
          </div>
        ))}
      </ContentContainer>
    </RootMapContainer>
  );
};
