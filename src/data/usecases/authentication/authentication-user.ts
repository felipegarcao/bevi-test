import { DomainAuthenticationReturn } from "@/domain/models/user";
import { Authentication } from "@/domain/usecases/remote/remote-authentication";

export class AuthenticationUserService implements Authentication {
  constructor(private readonly remoteAuthentication: Authentication) {}

  async requestAuth(
    params: Authentication.Params
  ): Promise<DomainAuthenticationReturn> {
    const authUser = this.remoteAuthentication.requestAuth(params);

    return authUser;
  }


}
