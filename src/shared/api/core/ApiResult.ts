/* istanbul ignore file */
 
export type ApiResult<T> = {
    readonly url: string;
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly body: T;
};
