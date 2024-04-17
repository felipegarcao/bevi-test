import { BadRequestError } from "@/domain/errors/badRequestError";
import { RequestTimeoutError } from "@/domain/errors/requestTimeout";
import { UnauthorizedError } from "@/domain/errors/unathorizedError";
import { UnexpectedError } from "@/domain/errors/unexpectedError";
import { UnprocessableError } from "@/domain/errors/UnprocessableError";
import { DomainProduct } from "@/domain/models/product";
import { Products } from "@/domain/usecases/remote/remote-products";
import {
  HttpBeviResponse,
  HttpErrorResponse,
  HttpClient,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";

export class RemoteProducts implements Products {
  constructor(
    private readonly HttpClient: HttpClient<
      HttpBeviResponse,
      HttpErrorResponse
    >
  ) {}

  async updated(params: DomainProduct): Promise<Products.Model> {
    const httpResponse = await this.HttpClient.request({
      url: "/product/update",
      method: "put",
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body.data;
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

  async list(): Promise<DomainProduct[]> {
    const httpResponse = await this.HttpClient.request({
      url: "/product/list",
      method: "post",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body.data;
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

  async create(params: DomainProduct): Promise<Products.Model> {
    const httpResponse = await this.HttpClient.request({
      url: "/product/create",
      method: "post",
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body.data;
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

  async delete(params: Products.ParamsId): Promise<Products.Model[]> {
    const httpResponse = await this.HttpClient.request({
      url: "/product/delete",
      method: "delete",
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body.data;
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
