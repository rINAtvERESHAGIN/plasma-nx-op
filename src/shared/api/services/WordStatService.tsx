import { request as __request } from '@shared/api/core/request';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { type SendPhraseParams, type PhrasesResponse } from '../model/WordStat';
import { type PlotData } from '../model/PlotData';

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
