import { DomainAuthenticationToken } from "@/domain/models/authentication-token";
import { Authentication } from "@/domain/usecases/remote/remote-authentication";

export class AuthenticationUserService implements Authentication {
  constructor(private readonly remoteAuthentication: Authentication) {}

  async requestAuth(
    params: Authentication.Params
  ): Promise<DomainAuthenticationToken> {
    const authUser = this.remoteAuthentication.requestAuth(params);

    return authUser;
  }


}
