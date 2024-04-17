import { faker } from "@faker-js/faker";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: 'get',
  body: {
    testeEnvio: 'Mock de envio do HTTP'
  },
  headers: {
    "Content-Type": "application/json",
  },
})


export class HttpClientSpy<R = any, T = any> implements HttpClient<R, T> {
  url?: string;
  method?: string;
  body?: any;
  headers?: any;
  response?: HttpResponse<R, T> = {
    statusCode: HttpStatusCode.ok
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;
    return await Promise.resolve(this.response);
  }
}
