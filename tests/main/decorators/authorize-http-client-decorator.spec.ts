import { faker } from "@faker-js/faker";
import { GetStorageSpy } from "@/tests/data/mocks/mock-cache";
import { HttpClientSpy, mockHttpRequest } from "@/tests/data/mocks/mock-http";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client";
import { HttpRequest } from "@/data/protocols/http/http-client";

type sutTypes = {
  sut: AuthorizeHttpClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (): sutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);
  return {
    sut,
    getStorageSpy,
    httpClientSpy,
  };
};

describe("AuthorizeHttpGetClientDecorator", () => {
  test("Should call GetStorage with correct value", async () => {
    const { sut, getStorageSpy } = makeSut();

    await sut.request(mockHttpRequest());

    expect(getStorageSpy.key).toBe("BeviToken");
  });

  test("Should not add headers if GetStorage is invalid", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(["get", "post", "put", "delete"]),
      headers: {
        field: faker.word.sample(),
      },
    };

    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual(httpRequest.headers);
  });

  test("Should add headers to HttpClient", async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut();
    const { access_token } = getStorageSpy.value;
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(["get", "post", "put", "delete"]),
    };

    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual({
      "Authorization" : `Bearer ${access_token}`,
    });
  });
});
