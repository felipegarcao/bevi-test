import { DomainAuthenticationToken } from "@/domain/models/authentication-token";
import { Authentication } from "@/domain/usecases/remote/remote-authentication";
import { faker } from "@faker-js/faker";

export const mockAuthenticationParams = (): Authentication.Params => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const mockAuthenticationModel = (): DomainAuthenticationToken => {
  return {
    id: faker.number.int(),
    email: faker.internet.email(),
    access_token: faker.string.uuid(),
    email_verified_at: null,
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
  };
};


export const mockReturnAuthentication = () => ({
  access_token: faker.string.uuid(),
    expires_in: faker.number.int(),
    token_type: faker.string.uuid()
})

