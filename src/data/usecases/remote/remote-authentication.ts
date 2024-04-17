import { BadRequestError } from "@/domain/errors/badRequestError";
import { RequestTimeoutError } from "@/domain/errors/requestTimeout";
import { UnauthorizedError } from "@/domain/errors/unathorizedError";
import { UnexpectedError } from "@/domain/errors/unexpectedError";
import { DomainAuthenticationToken } from "@/domain/models/authentication-token";
import { Authentication } from "@/domain/usecases/remote/remote-authentication";
import {
  HttpBeviResponse,
  HttpErrorResponse,
  HttpClient,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly HttpClient: HttpClient<HttpBeviResponse, HttpErrorResponse>
  ) {}

  async me(): Promise<any> {
    const httpResponse = await this.HttpClient.request({
      url: "/auth/me",
      method: "post",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return { data: httpResponse.body };
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      case HttpStatusCode.requestTimeout:
        throw new RequestTimeoutError();
      case HttpStatusCode.badRequest:
        throw new BadRequestError(httpResponse.error.errors[0].value);

      default:
        throw new UnexpectedError();
    }
  }

  async requestAuth(
    params: Authentication.Params
  ): Promise<DomainAuthenticationToken> {
    const httpResponse = await this.HttpClient.request({
      url: "/auth/login",
      method: "post",
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      case HttpStatusCode.requestTimeout:
        throw new RequestTimeoutError();
      case HttpStatusCode.badRequest:
        throw new BadRequestError(httpResponse.error.errors[0].value);
      default:
        throw new UnexpectedError();
    }
  }
}
