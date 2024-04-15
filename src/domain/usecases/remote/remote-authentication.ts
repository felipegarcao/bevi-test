import { DomainUser } from "../../../domain/models/user"
import { DomainAuthenticationToken } from "../../models/authentication-token";



export interface Authentication {
  requestAuth(params: Authentication.Params): Promise<DomainAuthenticationToken>
}


export namespace Authentication {
  export type LoginScreenReturn = DomainUser;

  export type Params = {
    email: string;
    password: string;
  }
}