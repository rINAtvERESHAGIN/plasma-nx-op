/* istanbul ignore file */
/* eslint-disable */
import type { FrontendLogInput } from '../models/FrontendLogInput';

import type { CancelablePromise } from '../../core/CancelablePromise';
import { OpenAPI } from '../../core/OpenAPI';
import { request as __request } from '../../core/request';

export class MicroAppService {

    /**
     * Index
     * @returns any Successful Response
     * @throws ApiError
     */
    public static microAppIndex(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    /**
     * Post Front Log
     * Log messages and errors from front-end.
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static microAppPostFrontLog(
        requestBody: FrontendLogInput,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/front-log',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
