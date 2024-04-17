import { mockAuthenticationModel, mockAuthenticationParams } from "../../domain/mocks/mock-authentication"
import { HttpClientSpy } from "@/tests/data/mocks/mock-http"
import { RemoteAuthentication } from "@/data/usecases/remote/remote-authentication"
import { UnexpectedError } from "@/domain/errors/unexpectedError"
import { UnauthorizedError } from "@/domain/errors/unathorizedError"
import { HttpStatusCode, HttpErrorResponse, HttpBeviResponse } from "@/data/protocols/http/http-client"
import { DomainAuthenticationToken } from "@/domain/models/authentication-token"
import { faker } from "@faker-js/faker"
import { BadRequestError } from "@/domain/errors/badRequestError"
import { RequestTimeoutError } from "@/domain/errors/requestTimeout"

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<HttpBeviResponse<DomainAuthenticationToken>, HttpErrorResponse>
}

export const makeSutRemoteAuthentication = () : SutTypes => {
  const HttpClient = new HttpClientSpy<HttpBeviResponse<DomainAuthenticationToken>, HttpErrorResponse>()
  const sut = new RemoteAuthentication(HttpClient)
  return {
    httpClientSpy: HttpClient,
    sut
  }
}

describe('Remote Authentication', () => {

  it('should throw UnexpectedError with return statusCode 500 ', async () => {
    const {sut, httpClientSpy} = makeSutRemoteAuthentication()
    httpClientSpy.response.statusCode = HttpStatusCode.serverError
    const authenticationParams = mockAuthenticationParams()
    const promise = sut.requestAuth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnauthorizedError with return statusCode 401 ', async () => {
    const {sut, httpClientSpy} = makeSutRemoteAuthentication()
    httpClientSpy.response.statusCode = HttpStatusCode.unauthorized
    const authenticationParams = mockAuthenticationParams()
    const promise = sut.requestAuth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  it('should throw RequestTimeoutError with return statusCode 408 ', async () => {
    const {sut, httpClientSpy} = makeSutRemoteAuthentication()
    httpClientSpy.response.statusCode = HttpStatusCode.requestTimeout
    const authenticationParams = mockAuthenticationParams()
    const promise = sut.requestAuth(authenticationParams)
    await expect(promise).rejects.toThrow(new RequestTimeoutError())
  })

  it('should throw BadRequestError with return statusCode 400 ', async () => {
    const {sut, httpClientSpy} = makeSutRemoteAuthentication()
    httpClientSpy.response.statusCode = HttpStatusCode.badRequest
    httpClientSpy.response.error = {
      errors: [{
        date: faker.date.anytime(),
        id: faker.system.networkInterface(),
        key: "ERROKEY",
        value: "Usuário ou Senha Inválida"
      }],
      status: HttpStatusCode.badRequest,
      success: false
    }
    const authenticationParams = mockAuthenticationParams()
    const promise = sut.requestAuth(authenticationParams)
    await expect(promise).rejects.toThrow(new BadRequestError(httpClientSpy.response.error.errors[0].value))
  })

  it('should return response body correctly with statusCode 200 ', async () => {
    const {sut, httpClientSpy} = makeSutRemoteAuthentication()
    const authenticationParams = mockAuthenticationParams()
    const responseTokens = mockAuthenticationModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        status: HttpStatusCode.ok,
        success: true,
        access_token: responseTokens.access_token
      }
    }
    const response = await sut.requestAuth(authenticationParams)
    expect(response).toStrictEqual(responseTokens)
  })
})
