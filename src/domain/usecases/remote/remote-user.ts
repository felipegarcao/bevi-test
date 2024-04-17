import { DomainUser } from "@/domain/models/user";

export interface User {
  me(): Promise<DomainUser>;
}

export namespace User {
  export type Model = DomainUser;
}