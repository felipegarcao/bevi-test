import {
  mockAuthenticationModel,
  mockAuthenticationParams,
} from "@/tests/domain/mocks/mock-authentication";
import { HttpClientSpy } from "../mocks/mock-http";
import { RemoteAuthentication } from "@/data/usecases/remote/remote-authentication";
import {
  HttpBeviResponse,
  HttpErrorResponse,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";
import { UnauthorizedError } from "@/domain/errors/unathorizedError";
import { UnexpectedError } from "@/domain/errors/unexpectedError";

type sutType = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<HttpBeviResponse, HttpErrorResponse>;
};

const makeSut = (): sutType => {
  const HttpClient = new HttpClientSpy<HttpBeviResponse, HttpErrorResponse>();
  const sut = new RemoteAuthentication(HttpClient);
  return {
    httpClientSpy: HttpClient,
    sut,
  };
};

describe("RemoteAuthentication", () => {
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
    };

    const promise = sut.requestAuth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new UnauthorizedError());
  });

  test("Should throw UnexpectedError if HttpClient returns 400", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.requestAuth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return an Authentication.Model if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockAuthenticationModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      // body: httpResult
    };

    const account = await sut.requestAuth(mockAuthenticationParams());

    expect(account).toEqual(httpResult);
  });
});
