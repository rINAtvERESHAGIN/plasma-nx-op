/* istanbul ignore file */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../../core/CancelablePromise';
import { OpenAPI } from '../../core/OpenAPI';
import { request as __request } from '../../core/request';

export class UsersService {

    /**
     * Fetch
     * fetches users.
     * @param xCorsarToken
     * @returns User Successful Response
     * @throws ApiError
     */
    public static usersFetch(
        xCorsarToken?: string,
    ): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/',
            cookies: {
                'X-CORSAR-Token': xCorsarToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Fetch By Login
     * fetches user.
     * @param login
     * @param xCorsarToken
     * @returns User Successful Response
     * @throws ApiError
     */
    public static usersFetchByLogin(
        login: string,
        xCorsarToken?: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{login}',
            path: {
                'login': login,
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
