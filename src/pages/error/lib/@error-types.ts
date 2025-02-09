export interface ErrorResponse {
  data: any
  internal: boolean
  status: number
  statusText: string
}

export type HttpErrorsCodes = 400 | 401 | 403 | 404 | 422 | 500 | 502 | 503

export type CommponErrorComponentProps = ErrorResponse
