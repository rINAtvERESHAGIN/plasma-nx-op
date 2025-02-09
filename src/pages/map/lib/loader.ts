import LabsService from '@shared/api/services/LabsService';
import ParametersService from '@shared/api/services/ParameterService';
import RegionInfoService from '@shared/api/services/RegionInfoService';
import MapBoundariesService from '@features/mapbox/utils/loader';
import { type Lab } from '@shared/api/model/Lab';
import { type AllRegion } from '@shared/api/model/AllRegion';
import { type Timeline } from '@shared/api/model/Timeline';
import ProcessorsService from '@shared/api/services/ProcessorsService';
import { type Parameter } from '@shared/api/model/Parameter';

export const mainLoader = async (): Promise<any[]> =>
  await Promise.all([
    LabsService.requestLabs(),
    ParametersService.requestParameters(),
    RegionInfoService.requestRegionInfo(),
    MapBoundariesService.requestMapBoudaries(),
    ProcessorsService.requestProcessors()
  ]);

interface ReturnCoreLoader {
  labs: Lab[];
  parameters: Parameter[];
  regions: AllRegion;
  boundaries: any;
  timeline: Timeline[];
  processors: any;
}

export const coreLoader = async (): Promise<ReturnCoreLoader> => {
  const responses = await Promise.all([
    LabsService.requestLabs(),
    ParametersService.requestParameters(),
    RegionInfoService.requestRegionInfo(),
    MapBoundariesService.requestMapBoudaries(),
    ProcessorsService.requestProcessors()
  ]);

  const keys: Array<keyof ReturnCoreLoader> = ['labs', 'parameters', 'regions', 'boundaries', 'processors'];

  return keys.reduce<ReturnCoreLoader | undefined>((acc, key, index) => {
    const response = responses[index];
    if (acc !== undefined) return { ...acc, [key as keyof ReturnCoreLoader]: response };

    return { [key as keyof ReturnCoreLoader]: response };
  }, undefined);
};
