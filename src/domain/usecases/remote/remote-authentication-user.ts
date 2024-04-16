import { DomainAuthenticationToken } from "../../models/authentication-token";
import { DomainUser } from "../../models/user";
import { Authentication } from "./remote-authentication";

export interface AuthenticationUser {
  auth(params: Authentication.Params): Promise<DomainAuthenticationToken>;
  me(): Promise<DomainUser>;
}
