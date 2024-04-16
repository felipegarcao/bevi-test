import { DomainUser } from "../../../domain/models/user";
import { DomainAuthenticationToken } from "../../models/authentication-token";

export interface Authentication {
  requestAuth(
    params: Authentication.Params
  ): Promise<DomainAuthenticationToken>;
  me(): Promise<DomainUser>;
}

export namespace Authentication {
  export type Model = DomainUser;

  export type Params = {
    email: string;
    password: string;
  };
}
