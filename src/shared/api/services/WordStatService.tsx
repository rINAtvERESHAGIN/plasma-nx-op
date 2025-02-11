import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { type CancelablePromise } from '../core/CancelablePromise';
import { type SendPhraseParams, type PhrasesResponse } from 'types';
import { type PlotData } from 'types';

export class WordStatService {
  static requestGetPhrases(): CancelablePromise<PhrasesResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/wordstat/'
    });
  }

  static requestSendPhrase(params: SendPhraseParams): CancelablePromise<PlotData> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/wordstat/',
      body: params
    });
  }
}
