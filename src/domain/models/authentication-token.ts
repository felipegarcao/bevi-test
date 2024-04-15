import { DomainUser } from "./user";

export type DomainAuthenticationToken = {
  access_token: string;
} & DomainUser;