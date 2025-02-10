import { AllRegion, Lab, Parameter, Timeline } from "types";
import MapBoundariesService from "../../../features/mapbox/utils/loader";
import LabsService from "../../../shared/api/services/LabsService";
import ParametersService from "../../../shared/api/services/ParameterService";
import ProcessorsService from "../../../shared/api/services/ProcessorsService";
import RegionInfoService from "../../../shared/api/services/RegionInfoService";


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
