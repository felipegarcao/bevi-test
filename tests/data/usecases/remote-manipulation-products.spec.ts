import { RemoteProducts } from "@/data/usecases/remote/remote-products";
import { HttpClientSpy } from "../mocks/mock-http";
import {
  HttpBeviResponse,
  HttpErrorResponse,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";


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

describe('RemoteProducts CRUD', () => {
  
})