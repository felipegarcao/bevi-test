import { GetStorage } from "../../data/protocols/cache";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "../../data/protocols/http/http-client";
import { DomainAuthenticationToken } from "../../domain/models/authentication-token";

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly _storage: GetStorage<DomainAuthenticationToken>,
    private readonly _httpClient: HttpClient
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const token = this._storage.get("BeviToken");
    if (token?.token) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: "Bearer " + token.token,
        }),
      });
    }
    const httpResponse = await this._httpClient.request(data);
    return httpResponse;
  }
}
