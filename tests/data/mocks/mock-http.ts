import { faker } from "@faker-js/faker";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http/http-client";


const objectElement = {
  [faker.lorem.word()]: faker.lorem.words(),
  [faker.lorem.word()]: faker.lorem.words()
}

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete']),
  body: objectElement,
  headers: objectElement
})

export class HttpClientSpy<R = any, T = any> implements HttpClient<R, T> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers

    return this.response
  }
}