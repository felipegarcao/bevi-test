import { AuthenticationUserService } from "../../../../data/usecases/authentication/authentication-user"
import { RemoteAuthentication } from "../../../../data/usecases/remote/remote-authentication"
import { LocalStorageCache } from "../../../../infra/storage/local-storage";
import { Login } from "../../../../presentation/pages/sign-in/Login";
import { AxiosRequestWithoutToken } from "../../infra/make-axios-http"

export function MakeLoginScreen( ) {
  

  const remoteAuthentication = new RemoteAuthentication(AxiosRequestWithoutToken())
  const service = new AuthenticationUserService(remoteAuthentication);
  const storage = new LocalStorageCache()


  return (
    <Login service={service} storage={storage} />
  )
}