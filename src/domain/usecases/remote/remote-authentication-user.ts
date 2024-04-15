import { DomainAuthenticationToken } from "../../models/authentication-token";
import { Authentication } from "./remote-authentication";

export interface AuthenticationUser {
  auth(params: Authentication.Params): Promise<DomainAuthenticationToken>;
  
}
