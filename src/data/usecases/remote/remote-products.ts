import { BadRequestError } from "../../../domain/errors/badRequestError";
import { RequestTimeoutError } from "../../../domain/errors/requestTimeout";
import { UnauthorizedError } from "../../../domain/errors/unathorizedError";
import { UnexpectedError } from "../../../domain/errors/unexpectedError";
import { UnprocessableError } from "../../../domain/errors/UnprocessableError";
import { DomainAuthenticationToken } from "../../../domain/models/authentication-token";
import { DomainProduct } from "../../../domain/models/product";
import { Products } from "../../../domain/usecases/remote/remote-products";
import {
  HttpBeviResponse,
  HttpErrorResponse,
  HttpClient,
  HttpStatusCode,
} from "../../protocols/http/http-client";

export class RemoteProducts implements Products {
  constructor(
    private readonly HttpClient: HttpClient<
      HttpBeviResponse<DomainAuthenticationToken>,
      HttpErrorResponse
    >
  ) {}

  async list(): Promise<DomainProduct[]> {
    const httpResponse = await this.HttpClient.request({
      url: "/product/list",
      method: "post",
    });


    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      case HttpStatusCode.requestTimeout:
        throw new RequestTimeoutError();
      case HttpStatusCode.badRequest:
        throw new BadRequestError(httpResponse.body?.message);
      case HttpStatusCode.Unprocessable:
        throw new UnprocessableError(httpResponse.body?.message);
      default:
        throw new UnexpectedError();
    }
  }
}
