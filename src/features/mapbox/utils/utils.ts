import type { FeatureCollection, GeoJSON } from 'geojson';
import { type RegionMap } from '@shared/api/model/RegionMap';
import tinycolor from 'tinycolor2';

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

export const updatePercentiles = (
  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Geometry>,
  accessor: (f: GeoJSON.Feature<GeoJSON.Geometry>) => number,
  regionStatus: RegionMap
): GeoJSON.FeatureCollection<GeoJSON.Geometry> => {
  const { features } = featureCollection;
  return {
    type: 'FeatureCollection',
    features: features.map((feature) => {
      let color = '#d0c8de';
      let detectorNow;
      let hoverColor = '#d0c8de';
      let featureStatus;
      const value = accessor(feature);

      if (regionStatus && feature.properties) {
        const hasRegionStatusProperty = regionStatus.hasOwnProperty(feature.properties.code)
          ? feature.properties.code
          : null;

        if (hasRegionStatusProperty) {
          detectorNow = regionStatus[feature.properties.code].detector_now;
          const { r, g, b, alpha, status } = regionStatus[feature.properties.code];

          if (r !== undefined && g !== undefined && b !== undefined && alpha !== undefined) {
            color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            hoverColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`;
            featureStatus = status;
          } else if (detectorNow) {
            const hslColorString = `hsl(${((1 - detectorNow) * 100).toFixed()}, 80%, 55%, 0.90)`;
            const hslColor = tinycolor(hslColorString);
            color = hslColor.toHexString();
            hoverColor = hslColor.setAlpha(0.4).toRgbString();
          }
        }
      }
      const properties = {
        ...feature.properties,
        value,
        color: color,
        detectorNow: detectorNow,
        fillColor: color,
        hoverFillColor: hoverColor,
        status: featureStatus
      };

      const updatedFeatures = { ...feature, properties };
      return updatedFeatures;
    })
  };
};
