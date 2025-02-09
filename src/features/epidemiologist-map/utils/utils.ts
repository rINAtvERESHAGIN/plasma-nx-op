import type { FeatureCollection } from 'geojson';
import { type RegionMap } from '@shared/api/model/RegionMap';
import { isNil } from 'lodash';

export const updatePercentiles = (
  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Geometry>,
  accessor: (f: GeoJSON.Feature<GeoJSON.Geometry>) => number,
  regionStatusMap: RegionMap
): GeoJSON.FeatureCollection<GeoJSON.Geometry> => {
  const { features } = featureCollection;

  return {
    type: 'FeatureCollection',
    features: features.map((feature) => {
      let color = '#B0C4C9';
      let hoverColor = '#B0C4C9';
      let featureStatus;

      const value = accessor(feature);

      if (!isNil(regionStatusMap) && !isNil(feature.properties)) {
        const hasRegionStatusProperty = regionStatusMap.hasOwnProperty(feature.properties.code)
          ? feature.properties.code
          : null;

        if (!isNil(hasRegionStatusProperty)) {
          const { r, g, b, alpha, status } = regionStatusMap[feature.properties.code];
          if (!isNil(status)) {
            if (!isNil(r) && !isNil(g) && !isNil(b) && !isNil(alpha) && status === 'ok') {
              color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
              hoverColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`;
              featureStatus = status;
            }
          }
        }
      }
      const properties = {
        ...feature.properties,
        value,
        color,
        fillColor: color,
        hoverFillColor: hoverColor,
        status: featureStatus
      };

      const updatedFeatures = { ...feature, properties };
      return updatedFeatures;
    })
  };
};

export const createMarkerFeatures = (featureCollection: FeatureCollection): FeatureCollection => {
  const markerFeatures = featureCollection.features.flatMap((feature) => {
    if (feature.properties && feature.properties.markerCoordinates) {
      const markerSize = feature.properties?.markerSize ?? 1;
      return feature.properties.markerCoordinates.map((coordinates) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates
        },
        properties: {
          status: feature.properties?.status,
          name: feature.properties?.name,
          code: feature.properties?.code,
          markerSize
        }
      }));
    }
    return [];
  });

  return {
    type: 'FeatureCollection',
    features: markerFeatures
  };
};

export const updateFeaturesWithMarkers = (
  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Geometry>,
  markers: Record<string, { markerCoordinates: number[][]; markerSize: number }>,
  regionStatus: RegionMap
): GeoJSON.FeatureCollection<GeoJSON.Geometry> => {
  const { features } = featureCollection;
  return {
    type: 'FeatureCollection',
    features: features.map((feature) => {
      const code = feature.properties?.code;
      const status = regionStatus?.[code]?.status ?? 'ok';

      if (code !== null && markers[code] !== null && feature.properties !== null) {
        feature.properties.markerCoordinates = markers[code].markerCoordinates;
        feature.properties.markerSize = markers[code].markerSize;
        feature.properties.status = status;
      }
      return feature;
    })
  };
};