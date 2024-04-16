import { AuthenticationUserService } from "@/data/usecases/authentication/authentication-user"
import { RemoteAuthentication } from "@/data/usecases/remote/remote-authentication"
import { AxiosRequestWithoutToken } from "@/main/factories/infra/make-axios-http"

export const makeAuthenticationUser = () => {
  const remote = new RemoteAuthentication(AxiosRequestWithoutToken())
  const authenticationUser = new AuthenticationUserService(remote)
  return authenticationUser
}