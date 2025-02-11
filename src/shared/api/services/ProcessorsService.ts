
import { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProcessorsService {
    static requestProcessors(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/processors/'
        });
    }
}


