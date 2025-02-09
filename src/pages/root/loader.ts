import { coreLoader, mainLoader } from '@pages/map/lib/loader';
import { type LoaderFunction } from 'react-router';
import AuthService from '@shared/api/services/AuthService';
import { type RootState, store } from '@app/store';
import { setLabs } from '@shared/model/labs';
import { setParameters } from '@pages/parameter/model';
import { setRegions } from '@shared/model/regions';
import { CoreDataActionCreatorService } from '@app/core-data-slice/reducer';
import { setActiveDefaultParameter } from '@shared/model/useActiveParameter';
import { type ThunkAction } from 'redux-thunk';
import { type AnyAction } from 'redux';
import { setActiveDefaultLab } from '@shared/model/useActiveLab';
import { setActiveDefaultRegion } from '@shared/model/useActiveRegion';
import { setActiveDefaultAgeRange } from '@shared/model/useActiveAgeRange';
import { setActiveDefaultHumanSex } from '@shared/model/useActiveHumanSex';

function extractPageNameFromUrl(url: string): string | null {
  const match = url.match(/\/([^/]+)$/);
  return match ? match[1] : null;
}

type InitiatingAction = () => ThunkAction<void, RootState, unknown, AnyAction>;

const initiatingDefaultSystemOperators: InitiatingAction[] = [
  setActiveDefaultParameter,
  setActiveDefaultLab,
  setActiveDefaultRegion,
  setActiveDefaultAgeRange,
  setActiveDefaultHumanSex
];

export const rootLoader: LoaderFunction = async ({ request }) => {
  return await AuthService.requestSessionId()
    .then(async () => {
      const response = await mainLoader();
      // DEPRECATE
      store.dispatch(setLabs(response[0]));
      store.dispatch(setParameters({ parameters: response[1] }));
      store.dispatch(setRegions(response[2]));
      // NEW VERSION
      const coreResponse = await coreLoader();
      store.dispatch(CoreDataActionCreatorService.setLabs(coreResponse.labs));
      store.dispatch(CoreDataActionCreatorService.setParameters(coreResponse.parameters));
      store.dispatch(CoreDataActionCreatorService.setRegions(coreResponse.regions));
      store.dispatch(CoreDataActionCreatorService.setProcessors(coreResponse.processors));

      initiatingDefaultSystemOperators.forEach((callBack) => {
        store.dispatch(callBack());
      });
      return coreResponse;
    })
    .catch((error) => {
      const errorMessage = JSON.parse(JSON.stringify(error));
      throw new Response(JSON.stringify({ afterAuth: extractPageNameFromUrl(request.url) ?? 'main' }), {
        status: errorMessage.status,
        statusText: { afterAuth: extractPageNameFromUrl(request.url) }
      });
    });
};
