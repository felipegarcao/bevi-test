import { HttpClientSpy } from "../mocks/mock-http";
import { RemoteUser } from "@/data/usecases/remote/remote-user";
import { mockAuthenticationModel } from "@/tests/domain/mocks/mock-authentication";
import { HttpStatusCode } from "@/data/protocols/http/http-client";
import { UnexpectedError } from "@/domain/errors/unexpectedError";

type sutTypeUser = {
  sut: RemoteUser;
  httpClientSpy: HttpClientSpy;
};

const makeSutUser = (): sutTypeUser => {
  const HttpClient = new HttpClientSpy();
  const sut = new RemoteUser(HttpClient);
  return {
    httpClientSpy: HttpClient,
    sut,
  };
};

describe("RemoteUser", () => {
  test("Should return an Authentication if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSutUser();
    const httpResult = mockAuthenticationModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        id: httpResult.id,
        name: httpResult.name,
        email: httpResult.email,
        email_verified_at: httpResult.email_verified_at,
        created_at: httpResult.created_at,
        updated_at: httpResult.updated_at,
      },
    };

    const account = await sut.me();

    expect(account).toEqual(httpResult);
  });

  it("Should throw UnexpectedError if HttpClient returns 404", async () => {
    const { sut, httpClientSpy } = makeSutUser();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
      body: {
        success: false,
        message: "Route [login] not defined.",
        code: HttpStatusCode.notFound,
        data: [],
      },
    };

    const promise = sut.me();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
