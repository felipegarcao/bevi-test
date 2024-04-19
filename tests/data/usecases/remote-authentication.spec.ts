import {
  mockAuthenticationParams,
  mockReturnAuthentication,
} from "@/tests/domain/mocks/mock-authentication";
import { HttpClientSpy } from "../mocks/mock-http";
import { RemoteAuthentication } from "@/data/usecases/remote/remote-authentication";
import {
  HttpErrorResponse,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";
import { UnauthorizedError } from "@/domain/errors/unathorizedError";

import { DomainAuthenticationReturn } from "@/domain/models/user";

type sutType = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<DomainAuthenticationReturn, HttpErrorResponse>;
};

const makeSut = (): sutType => {
  const HttpClient = new HttpClientSpy<
    DomainAuthenticationReturn,
    HttpErrorResponse
  >();
  const sut = new RemoteAuthentication(HttpClient);
  return {
    httpClientSpy: HttpClient,
    sut,
  };
};

describe("RemoteAuthentication", () => {
  test("Should login", async () => {
    const { sut, httpClientSpy } = makeSut();
    const response = mockReturnAuthentication();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: response,
    };

    const result = await sut.requestAuth({
      email: "test@example.com",
      password: "testpassword",
    });

    expect(result).toStrictEqual(response);
  });

  test("Should call HttpClient with correct values", async () => {
    const { sut, httpClientSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();

    await sut.requestAuth(authenticationParams);

    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toEqual(authenticationParams);
  });

  test("Should throw InvalidCredentialsError if HttpClient returns 401", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
      error: "Unauthorized",
    };

    const promise = sut.requestAuth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new UnauthorizedError());
  });
});
