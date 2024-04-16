import { AuthenticationUserService } from "../../../../data/usecases/authentication/authentication-user"
import { RemoteAuthentication } from "../../../../data/usecases/remote/remote-authentication"
import { LocalStorageCache } from "../../../../infra/storage/local-storage";
import { Login } from "../../../../presentation/pages/sign-in/Login";
import { AxiosRequestWithoutToken, AxiosRequestWithToken } from "../../infra/make-axios-http"

export function MakeLoginScreen( ) {
  

  const remoteAuthentication = new RemoteAuthentication(AxiosRequestWithoutToken());
  const serviceAuthentication = new AuthenticationUserService(remoteAuthentication);

  const remoteUserData = new RemoteAuthentication(AxiosRequestWithToken());
  const serviceUserData =  new AuthenticationUserService(remoteUserData);
  const storage = new LocalStorageCache()


  return (
    <Login 
      remoteAuthentication={serviceAuthentication}  
      remoteUserData={serviceUserData}
      storage={storage} 
      
      />
  )
}