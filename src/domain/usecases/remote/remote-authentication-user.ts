import { DomainAuthenticationToken } from "@/domain/models/authentication-token";
import { DomainUser } from "@/domain/models/user";
import { Authentication } from "./remote-authentication";

export interface AuthenticationUser {
  auth(params: Authentication.Params): Promise<DomainAuthenticationToken>;
  me(): Promise<DomainUser>;
}
