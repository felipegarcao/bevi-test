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


// declarando que a resposta pode ser qualquer coisa, por que vão ser dois tipos de response 
const makeSut = () => {
  const httpClient = new HttpClientSpy<
    any,
    HttpErrorResponse
  >();
  const remoteAuthentication = new RemoteAuthentication(httpClient);
  const remoteUserData = new RemoteUser(httpClient)
  const service = new AuthenticationUserService(remoteAuthentication);
  const storage = new LocalStorageCache()
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Login
          remoteAuthentication={service}
          remoteUserData={remoteUserData}
          storage={storage} />
      </MemoryRouter>
    </Provider>
  );
};

describe("Login Screen", () => {
  test("Should render screen correctly without error", () => {
    render(makeSut());
  })

});