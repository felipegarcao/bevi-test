import { DomainAuthenticationToken } from "../../../domain/models/authentication-token";
import { Authentication } from "../../../domain/usecases/remote/remote-authentication";
import { AuthenticationUser } from "../../../domain/usecases/remote/remote-authentication-user";

export class AuthenticationUserService implements AuthenticationUser {
  constructor(private readonly remoteAuthentication: Authentication) {}

  async auth(params: Authentication.Params): Promise<DomainAuthenticationToken> {
    const authUser = this.remoteAuthentication.requestAuth(params);

    return authUser;
  }
}
