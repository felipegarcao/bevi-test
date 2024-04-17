import { AuthenticationUserService } from "@/data/usecases/authentication/authentication-user"
import { RemoteAuthentication } from "@/data/usecases/remote/remote-authentication"
import { LocalStorageCache } from "@/infra/storage/local-storage";
import { Login } from "@/presentation/pages/sign-in/Login";
import { AxiosRequestWithoutToken, AxiosRequestWithToken } from "@/main/factories/infra/make-axios-http"
import { RemoteUser } from "@/data/usecases/remote/remote-user";

export function MakeLoginScreen( ) {
  

  const remoteAuthentication = new RemoteAuthentication(AxiosRequestWithoutToken());
  const serviceAuthentication = new AuthenticationUserService(remoteAuthentication);

  const serviceUserData =  new RemoteUser(AxiosRequestWithToken());
  const storage = new LocalStorageCache()


  return (
    <Login 
      remoteAuthentication={serviceAuthentication}  
      remoteUserData={serviceUserData}
      storage={storage} 
      
      />
  )
}