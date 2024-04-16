export interface HttpClient<R = any, T = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R, T>>
}

export type HttpRequest = {
  url: string
  method: HttpMethod
  responseType?: ResponseType
  body?: any
  headers?: {
    [key: string]: string
  }

}

type ResponseType = 'blob' | 'arraybuffer' | 'document' | 'json' | 'stream' | 'text'

export type HttpResponse<R = any, T = any> = {
  statusCode: number;
  body?: R
  headers?: any
  error?: T
}

export type HttpErrorResponse = {
  success: boolean;
  status: number;
  errors: HttpError[]
}

export type HttpError = {
  date: Date;
  id: string;
  key: string;
  value: string;
}

export type HttpBeviResponse<R = any> = {
  success: boolean;
  status: number;
  data?: R
  messages?: any;
  message?: any;
  access_token: string;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  requestTimeout = 408,
  serverError = 500,
  Unprocessable = 422
}