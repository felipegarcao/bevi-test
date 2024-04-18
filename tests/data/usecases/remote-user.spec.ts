import { DomainUser } from "@/domain/models/user";
import { HttpClientSpy } from "../mocks/mock-http";
import { RemoteUser } from "@/data/usecases/remote/remote-user";
import { mockAuthenticationModel } from "@/tests/domain/mocks/mock-authentication";
import { HttpStatusCode } from "@/data/protocols/http/http-client";

type sutTypeUser = {
  sut: RemoteUser;
  httpClientSpy: HttpClientSpy<DomainUser>;
};

const makeSutUser = (): sutTypeUser => {
  const HttpClient = new HttpClientSpy<DomainUser>();
  const sut = new RemoteUser(HttpClient);
  return {
    httpClientSpy: HttpClient,
    sut,
  };
};

describe("RemoteUser", () => {
  test("Should return an Authentication if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSutUser();5
    const httpResult = mockAuthenticationModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const account = await sut.me();

    expect(account).toEqual(httpResult);
  });
});
