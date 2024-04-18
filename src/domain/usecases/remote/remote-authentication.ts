import { DomainAuthenticationReturn, DomainUser } from "@/domain/models/user";

export interface Authentication {
  requestAuth(
    params: Authentication.Params
  ): Promise<DomainAuthenticationReturn>;
}

export namespace Authentication {
  export type Model = DomainUser;

  export type Params = {
    email: string;
    password: string;
  };
}
