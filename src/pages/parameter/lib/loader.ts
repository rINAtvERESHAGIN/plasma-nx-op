import ParametersService from '@shared/api/services/ParameterService';

export function loaderParameter () {
  return ParametersService.requestParameters();
}
