import { DomainAuthenticationToken } from "@/domain/models/authentication-token";
import { AxiosHttpClient } from "@/infra/axios-http-client";
import { LocalStorageCache } from "@/infra/storage/local-storage";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client";


export const AxiosRequestWithoutToken = () => {
  const httpClient = new AxiosHttpClient(import.meta.env.VITE_API_BASEURL);
  return httpClient;
};

export const AxiosRequestWithToken = (APIBASE = import.meta.env.VITE_API_BASEURL) => {
  const storage = new LocalStorageCache<DomainAuthenticationToken>()
  const httpClient = new AxiosHttpClient(APIBASE);
  const protectRequest = new AuthorizeHttpClientDecorator(storage, httpClient);
  return protectRequest;
};