/* istanbul ignore file */
/* eslint-disable */
import type { Role } from '../models/Role';

import type { CancelablePromise } from '../../core/CancelablePromise';
import { OpenAPI } from '../../core/OpenAPI';
import { request as __request } from '../../core/request';

export class RolesService {

    /**
     * Fetch
     * fetches roles.
     * @param xCorsarToken
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static rolesFetch(
        xCorsarToken?: string,
    ): CancelablePromise<Array<Role>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/roles/',
            cookies: {
                'X-CORSAR-Token': xCorsarToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Fetch By Code
     * fetches role.
     * @param code
     * @param xCorsarToken
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static rolesFetchByCode(
        code: string,
        xCorsarToken?: string,
    ): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/roles/{code}',
            path: {
                'code': code,
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
