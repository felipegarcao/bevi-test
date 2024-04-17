import { BadRequestError } from "@/domain/errors/badRequestError";
import { RequestTimeoutError } from "@/domain/errors/requestTimeout";
import { UnauthorizedError } from "@/domain/errors/unathorizedError";
import { UnexpectedError } from "@/domain/errors/unexpectedError";
import {
  HttpClient,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";
import { DomainUser } from "@/domain/models/user";
import { User } from "@/domain/usecases/remote/remote-user";

export class RemoteUser implements User {
  constructor(
    private readonly HttpClient: HttpClient<DomainUser>
  ) {}

  async me(): Promise<DomainUser> {
    const httpResponse = await this.HttpClient.request({
      url: "/auth/me",
      method: "post",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      case HttpStatusCode.requestTimeout:
        throw new RequestTimeoutError();
      case HttpStatusCode.badRequest:
        throw new BadRequestError('Algo de errado aconteceu, tente novamente mais tarde.');

      default:
        throw new UnexpectedError();
    }
  }

}