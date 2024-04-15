import { AuthenticationUserService } from "../../../../data/usecases/authentication/authentication-user"
import { RemoteAuthentication } from "../../../../data/usecases/remote/remote-authentication"
import { AxiosRequestWithoutToken } from "../../infra/make-axios-http"

export const makeAuthenticationUser = () => {
  const remote = new RemoteAuthentication(AxiosRequestWithoutToken())
  const authenticationUser = new AuthenticationUserService(remote)
  return authenticationUser
}