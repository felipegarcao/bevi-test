import { DomainUser } from "../../../domain/models/user"



export interface Authentication {
  requestAuth(params: Authentication.Params): Promise<void>
}


export namespace Authentication {
  export type LoginScreenReturn = DomainUser;

  export type Params = {
    email: string;
    password: string;
  }
}