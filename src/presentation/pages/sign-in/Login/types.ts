import { AuthenticationUserService } from "@/data/usecases/authentication/authentication-user"
import { DomainAuthenticationToken } from "@/domain/models/authentication-token"
import { LocalStorageCache } from "@/infra/storage/local-storage"

export type useLoginControllerDI = {
  remoteAuthentication: AuthenticationUserService;
  remoteUserData: AuthenticationUserService;
  storage: LocalStorageCache<DomainAuthenticationToken>
}