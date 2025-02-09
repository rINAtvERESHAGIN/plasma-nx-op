import RegionService from '@shared/api/services/RegionService';
import LabsService from '@shared/api/services/LabsService';
import ParametersService from '@shared/api/services/ParameterService';
import { store } from '@app/store';
import { initParameters } from '@pages/parameter/model';
import { setLabs } from '@shared/model/labs';
import { setRegions } from '@shared/model/regions';
import { setApplicationStatus } from '@shared/ui/application status/model';

export const loaderComparison = async () => {
  try {
    store.dispatch(setApplicationStatus('loading'));
    const responses = await Promise.all([
      LabsService.requestLabs(),
      ParametersService.requestParameters(),
      RegionService.requestGetAllRegions()
    ]);
    const [labs, parametes, regions] = responses;
    store.dispatch(initParameters({ parameters: parametes }));
    store.dispatch(setLabs(labs));
    store.dispatch(setRegions(regions));

    store.dispatch(setApplicationStatus(undefined));
    return responses;
  } catch (error) {
    store.dispatch(setApplicationStatus('error'));
    console.error(error);
    const errorMessage = JSON.parse(JSON.stringify(e));
    throw new Response(JSON.stringify(errorMessage.body), {
      status: errorMessage.status,
      statusText: errorMessage.statusText
    });
  }
};
