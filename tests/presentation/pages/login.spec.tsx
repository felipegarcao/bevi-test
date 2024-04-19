import { render } from "@testing-library/react";
import { Login } from "@/presentation/pages/sign-in/Login";
import { AuthenticationUserService } from "@/data/usecases/authentication/authentication-user";
import { RemoteAuthentication } from "@/data/usecases/remote/remote-authentication";
import {
  HttpErrorResponse,
} from "@/data/protocols/http/http-client";
import { Provider } from "react-redux";
import { store } from "@/infra/redux-store/store";
import { MemoryRouter } from "react-router-dom";
import { LocalStorageCache } from "@/infra/storage/local-storage";
import { RemoteUser } from "@/data/usecases/remote/remote-user";
import { HttpClientSpy } from "@/tests/data/mocks/mock-http";
import { DomainAuthenticationReturn, DomainUser } from "@/domain/models/user";




type sutTypeUser = {
  sutUser: RemoteUser;
  httpClientUserSpy: HttpClientSpy<DomainUser>
}

const makeSutUser = (): sutTypeUser => {
  const HttpClient = new HttpClientSpy<DomainUser>();
  const sutUser = new RemoteUser(HttpClient);
  return {
    httpClientUserSpy: HttpClient,
    sutUser,
  };
};

type sutType = {
  sutAuthentication: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<DomainAuthenticationReturn, HttpErrorResponse>;
}

const makeSut = (): sutType => {
  const HttpClient = new HttpClientSpy<DomainAuthenticationReturn, HttpErrorResponse>();
  const sutAuthentication = new RemoteAuthentication(HttpClient);
  return {
    httpClientSpy: HttpClient,
    sutAuthentication,
  };
};


describe("Login Screen", () => {
  test("Should render screen correctly without error", () => {
    const { sutUser } = makeSutUser()
    const { sutAuthentication } = makeSut()
    const storage = new LocalStorageCache()
    const serviceAuthentication = new AuthenticationUserService(sutAuthentication);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login
            remoteAuthentication={serviceAuthentication}
            remoteUserData={sutUser}
            storage={storage} />
        </MemoryRouter>
      </Provider>
    );
  })

});