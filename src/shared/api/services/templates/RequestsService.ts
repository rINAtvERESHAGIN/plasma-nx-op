/* istanbul ignore file */
/* eslint-disable */
import type { Request } from '../models/Request';

import type { CancelablePromise } from '../../core/CancelablePromise';
import { OpenAPI } from '../../core/OpenAPI';
import { request as __request } from '../../core/request';

export class RequestsService {

    /**
     * Fetch
     * fetches requests.
     * @param xCorsarToken
     * @returns Request Successful Response
     * @throws ApiError
     */
    public static requestsFetch(
        xCorsarToken?: string,
    ): CancelablePromise<Array<Request>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/requests',
            cookies: {
                'X-CORSAR-Token': xCorsarToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Fetch By Request Id
     * fetches request.
     * @param requestNumber
     * @param xCorsarToken
     * @returns Request Successful Response
     * @throws ApiError
     */
    public static requestsFetchByRequestId(
        requestNumber: string,
        xCorsarToken?: string,
    ): CancelablePromise<Request> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/requests/{request_number}',
            path: {
                'request_number': requestNumber,
            },
            cookies: {
                'X-CORSAR-Token': xCorsarToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
