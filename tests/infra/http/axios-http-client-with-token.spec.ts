import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client"
import { HttpClientSpy, mockHttpRequest } from "../../data/mocks/mock-http"
import { HttpErrorResponse, HttpBeviResponse } from "@/data/protocols/http/http-client"
import { DomainAuthenticationToken } from "@/domain/models/authentication-token"
import { LocalStorageCacheSpy } from "../../data/mocks/mock-local-storage"

type SutTypes = {
  localStorageCacheSpy: LocalStorageCacheSpy
  httpSpyClient: HttpClientSpy<HttpBeviResponse<DomainAuthenticationToken>, HttpErrorResponse>
  sut: AuthorizeHttpClientDecorator
}


const makeSut = () : SutTypes => {
  const httpSpyClient = new HttpClientSpy<HttpBeviResponse<DomainAuthenticationToken>, HttpErrorResponse>()
  const localStorageCacheSpy = new LocalStorageCacheSpy()
  const sut = new AuthorizeHttpClientDecorator(localStorageCacheSpy, httpSpyClient)

  return {localStorageCacheSpy, sut, httpSpyClient}
}


describe("Authenticated HttpClient With Access_token Verification", () => {
  it("should insert Bearer Token in HttpClient", async () => {
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzOTE3MjU4Njg0MiIsImVtYWlsIjoiZ2lvdmFuaS5vbGl2ZWlyYUB1bmltZWRwcnVkZW50ZS5jb20uYnIiLCJuYmYiOjE2OTM5MjIyNzIsImV4cCI6MTY5MzkzNjY3MiwiaWF0IjoxNjkzOTIyMjcyLCJpc3MiOiJVUFAuU2VydmljZXMuUmVkZUNyZWRlbmNpYWRhLlBvcnRhbCIsImF1ZCI6IlVQUC5TZXJ2aWNlcy5SZWRlQ3JlZGVuY2lhZGEuUG9ydGFsIn0.Fq06mCjqI1g-jsB1jzB0XNcCxQmV_3M6jHYoDvFeoEU"
    const request = mockHttpRequest()
    const { sut, localStorageCacheSpy, httpSpyClient } = makeSut()
    localStorageCacheSpy.objectReturn = {access_token}
    await sut.request(request)
    expect(httpSpyClient.headers["Authorization"]).toContain(`Bearer ${access_token}`);
  })
})