import { AuthenticationUserService } from "@/data/usecases/authentication/authentication-user"
import { RemoteUser } from "@/data/usecases/remote/remote-user";
import { DomainAuthenticationToken } from "@/domain/models/authentication-token"
import { LocalStorageCache } from "@/infra/storage/local-storage"

export type useLoginControllerDI = {
  remoteAuthentication: AuthenticationUserService;
  remoteUserData: RemoteUser;
  storage: LocalStorageCache<DomainAuthenticationToken>
}