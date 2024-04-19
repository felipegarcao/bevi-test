import { RemoteProducts } from "@/data/usecases/remote/remote-products";
import { HttpClientSpy } from "../mocks/mock-http";
import {
  HttpBeviResponse,
  HttpErrorResponse,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";
import { mockRemoteProducstListModel } from "../mocks/mock-remote-products-list";
import { UnprocessableError } from "@/domain/errors/UnprocessableError";
import { mockListProducts } from "@/tests/domain/mocks/mock-listProducts";


type sutType = {
  sut: RemoteProducts;
  httpClientSpy: HttpClientSpy<HttpBeviResponse, HttpErrorResponse>;
};

const makeSut = (): sutType => {
  const HttpClient = new HttpClientSpy<HttpBeviResponse, HttpErrorResponse>();
  const sut = new RemoteProducts(HttpClient);
  return {
    httpClientSpy: HttpClient,
    sut,
  };
};

describe("RemoteProducts", () => {

  // list
  it("Should return a list of ProducstModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteProducstListModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: httpResult,
        status: HttpStatusCode.ok,
        success: true,
        message: "Produto(s) listado(s) com sucesso.",
      },
    };

    const producstList = await sut.list();

    expect(producstList.data).toEqual([
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
    expect(httpClientSpy.method).toBe("post");
  });

  it("Should return an empty list if HttpClient returns 422", async () => {
    const { httpClientSpy, sut } = makeSut();

    const errorMessage = "Não há produtos a serem listados.";

    httpClientSpy.response = {
      statusCode: HttpStatusCode.Unprocessable,
      body: {
        status: HttpStatusCode.Unprocessable,
        success: false,
        message: errorMessage,
      },
    };

    const promise = sut.list();

    await expect(promise).rejects.toThrow(
      new UnprocessableError(httpClientSpy.response.body.message)
    );
  });

  // edit

  it("Should edit the product with the put method", async () => {
    const { sut, httpClientSpy } = makeSut();
    const listProductsParams = mockListProducts();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
        status: HttpStatusCode.ok,
        message: "Produto atualizado com sucesso.",
        data: listProductsParams,
      },
    };

    const response = await sut.updated(listProductsParams);

    expect(httpClientSpy.method).toBe("put");
    expect(httpClientSpy.body).toEqual(listProductsParams);
    expect(httpClientSpy.response.body).toEqual(response);
  });

  it("Should updated product with error 422", async () => {
    const { sut, httpClientSpy } = makeSut();
    const listProductsParams = mockListProducts();

    const errorMessage = "Os dados fornecidos são inválidos."

    httpClientSpy.response = {
      statusCode: HttpStatusCode.Unprocessable,
      body: {
        success: false,
        status: HttpStatusCode.Unprocessable,
        message: errorMessage,
        data: []
      },
    };


    const promise = sut.updated(listProductsParams);

    await expect(promise).rejects.toThrow(new UnprocessableError());


  })

  // create

  it("Should create the product with the post method", async () => {
    const { sut, httpClientSpy } = makeSut();
    const listProductsParams = mockListProducts();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
        status: HttpStatusCode.ok,
        message: "Produto criado com sucesso.",
        data: listProductsParams,
      },
    };

    const response = await sut.create(listProductsParams);

    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.response.body).toEqual(response);
  });

  it("Should return an empty post if HttpClient returns 422", async () => {
    const { httpClientSpy, sut } = makeSut();

    const errorMessage = "Os dados fornecidos são inválidos.";

    const invalidProduct = {
      name: "",
      description: "Descrição Produto 1",
      price: 50.5,
      status: 1,
      stock_quantity: 10,
    };

    httpClientSpy.response = {
      statusCode: HttpStatusCode.Unprocessable,
      body: {
        status: HttpStatusCode.Unprocessable,
        success: false,
        message: errorMessage,
        data: [],
      },
    };

    const promise = sut.create(invalidProduct);

    await expect(promise).rejects.toThrow(
      new UnprocessableError(httpClientSpy.body.message)
    );
  });

  // delete

  it("Should delete product", async () => {
    const { sut, httpClientSpy } = makeSut();
    const listProductsParams = mockListProducts();

    const mockIdProducts = {
      id: listProductsParams.id,
    };

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
        status: HttpStatusCode.ok,
        message: "Produto deletado com sucesso.",
        data: mockIdProducts,
      },
    };

    const response = await sut.delete(mockIdProducts);

    expect(httpClientSpy.method).toBe("delete");
    expect(httpClientSpy.body).toEqual(mockIdProducts);
    expect(httpClientSpy.response.body).toEqual(response);
  });

  it("Should delete product with error 422", async () => {
    const { sut, httpClientSpy } = makeSut();
    const listProductsParams = mockListProducts();

    const mockIdProducts = {
      id: listProductsParams.id,
    };

    const errorMessage = "Não foi possível deletar produto.";

    httpClientSpy.response = {
      statusCode: HttpStatusCode.Unprocessable,
      body: {
        success: false,
        status: HttpStatusCode.Unprocessable,
        message: errorMessage,
      },
    };

    const promise = sut.delete(mockIdProducts);

    await expect(promise).rejects.toThrow(new UnprocessableError());
  });
});
