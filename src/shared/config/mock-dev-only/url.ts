export const baseUrl = 'http://localhost:3001/';
export const testServerBaseUrl = 'http://10.12.1.32:8778/';
export const getRegionDataUrl = 'api/regions';
export const getLabsUrl = 'labs/';
export const getParametrUrl = 'parameter/';
export const getParameterDetailsUrl = (parameterSelected: string | undefined, labSelected: string): string => `parameter/${parameterSelected}/${labSelected}/`;
export const getGeoMapParametrUrl = (parameterSelected: string, labSelected: string, overviewInformation): string => `detector/${parameterSelected}/${labSelected}/${overviewInformation}`;

export const getDetectorTableUrl = 'detector-table/';
export const getDetectorForRegionParameterUrl_ = 'detector/';

export const getDetectorForRegionParameterUrl = (parameterSelected: string, labSelected: string, regionSelected: string): string => `detector_region_param_lab/${parameterSelected}/${labSelected}/${regionSelected}/`;
