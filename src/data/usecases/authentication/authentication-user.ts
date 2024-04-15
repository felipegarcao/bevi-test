import { Authentication } from "../remote/remote-authentication";
import { AuthenticationUser } from "../remote/remote-authentication-user";



export class AuthenticaitonUserService implements AuthenticationUser {
  constructor(private readonly remoteAuthentication: Authentication) {}


 async auth(params: Authentication.Params): Promise<void> {
    const authUser = this.remoteAuthentication.requestAuth(params);

    return authUser;
  }


  

}