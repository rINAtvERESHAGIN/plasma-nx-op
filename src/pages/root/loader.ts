import { RootState, store } from 'store-plasma';
import { coreLoader, mainLoader } from '../map/lib/loader';
import { setActiveDefaultParameter } from '../../shared/model/useActiveParameter';
import { ThunkAction } from '@reduxjs/toolkit';
import { LoaderFunction } from 'react-router-dom';
import { AnyAction } from 'redux';
import AuthService from '../../shared/api/services/AuthService';
import { setLabs } from '../../shared/model/labs';
import { setRegions } from '../../shared/model/regions';
import { setActiveDefaultAgeRange } from '../../shared/model/useActiveAgeRange';
import { setActiveDefaultHumanSex } from '../../shared/model/useActiveHumanSex';
import { setActiveDefaultLab } from '../../shared/model/useActiveLab';
import { setActiveDefaultRegion } from '../../shared/model/useActiveRegion';
import { setParameters } from '../parameter/model';


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
