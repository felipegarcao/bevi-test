import { BadRequestError } from "@/domain/errors/badRequestError";
import { RequestTimeoutError } from "@/domain/errors/requestTimeout";
import { UnauthorizedError } from "@/domain/errors/unathorizedError";
import { UnexpectedError } from "@/domain/errors/unexpectedError";
import { Authentication } from "@/domain/usecases/remote/remote-authentication";
import {
  HttpErrorResponse,
  HttpClient,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";
import { DomainAuthenticationReturn } from "@/domain/models/user";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly HttpClient: HttpClient<DomainAuthenticationReturn, HttpErrorResponse>
  ) {}

  async requestAuth(
    params: Authentication.Params
  ): Promise<DomainAuthenticationReturn> {
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
        throw new BadRequestError(
          "Algo de errado aconteceu, tente novamente mais tarde."
        );
      default:
        throw new UnexpectedError();
    }
  }
}
