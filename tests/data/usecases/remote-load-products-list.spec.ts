import { RemoteProducts } from "@/data/usecases/remote/remote-products";
import { HttpClientSpy } from "../mocks/mock-http";
import {
  HttpErrorResponse,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";
import { mockRemoteProducstListModel } from "../mocks/mock-remote-products-list";
import { UnprocessableError } from "@/domain/errors/UnprocessableError";
import { mockListProducts } from "@/tests/domain/mocks/mock-listProducts";
import { UnexpectedError } from "@/domain/errors/unexpectedError";
import { UnauthorizedError } from "@/domain/errors/unathorizedError";

type sutType = {
  sut: RemoteProducts;
  httpClientSpy: HttpClientSpy<any, HttpErrorResponse>;
};

const makeSut = (): sutType => {
  const HttpClient = new HttpClientSpy<any, HttpErrorResponse>();
  const sut = new RemoteProducts(HttpClient);
  return {
    httpClientSpy: HttpClient,
    sut,
  };
};

describe("RemoteProducts", () => {
  it("Should call httpClient with correct URL and Method", async () => {
    const { sut, httpClientSpy } = makeSut();

    await sut.list();

    expect(httpClientSpy.method).toBe("post");
  });

  // quando a listagem esta vazia é retornado 422 da API.
  it("Should return an empty list if HttpClient returns 422", async () => {
    const { httpClientSpy, sut } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.Unprocessable,
    };

    const promise = sut.list();

    await expect(promise).rejects.toThrow(new UnprocessableError());
  });

  it('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.list()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.list()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const promise = sut.list()

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  it("Should return a list of ProducstModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteProducstListModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const producstList = await sut.list();

    expect(producstList).toEqual([
      {
        id: httpResult[0].id,
        name: httpResult[0].name,
        price: httpResult[0].price,
        description: httpResult[0].description,
        status: httpResult[0].status,
        stock_quantity: httpResult[0].stock_quantity,
      },
      {
        id: httpResult[1].id,
        name: httpResult[1].name,
        price: httpResult[1].price,
        description: httpResult[1].description,
        status: httpResult[1].status,
        stock_quantity: httpResult[1].stock_quantity,
      },
      {
        id: httpResult[2].id,
        name: httpResult[2].name,
        price: httpResult[2].price,
        description: httpResult[2].description,
        status: httpResult[2].status,
        stock_quantity: httpResult[2].stock_quantity,
      },
    ]);
  });

  it("Should edit product", async () => {
    const { sut, httpClientSpy } = makeSut();

    const listProductsParams = mockListProducts();

    await sut.updated(listProductsParams);

    expect(httpClientSpy.method).toBe("put");
    expect(httpClientSpy.body).toEqual(listProductsParams);
  });


  it("Should create product", async () => {
    const { sut, httpClientSpy } = makeSut();

    const listProductsParams = mockListProducts();

    await sut.create(listProductsParams);

    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toEqual(listProductsParams);
  });


});
