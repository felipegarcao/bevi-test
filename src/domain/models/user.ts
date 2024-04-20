export type DomainUser = {
  id: number,
  name: string;
  email: string;
  email_verified_at: boolean,
  created_at?: string;
  updated_at?: string;
  expires_token?: Date;
}


export type DomainAuthenticationReturn = {
  access_token: string;
  expires_in: number;
  token_type: string;
}