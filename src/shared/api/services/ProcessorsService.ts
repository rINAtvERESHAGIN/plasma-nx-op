import { type CancelablePromise } from '@shared/api/core/CancelablePromise';
import { OpenAPI } from '@shared/api/core/OpenAPI';
import { request as __request } from '../core/request';

class ProcessorsService {
    static requestProcessors(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/processors/'
        });
    }
}

export default ProcessorsService;
