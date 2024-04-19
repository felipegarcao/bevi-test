import { DomainUser } from "@/domain/models/user";
import { Authentication } from "@/domain/usecases/remote/remote-authentication";
import { faker } from "@faker-js/faker";

export const mockAuthenticationParams = (): Authentication.Params => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const mockAuthenticationModel = (): DomainUser => {
  return {
    id: faker.number.int(),
    email: faker.internet.email(),
    email_verified_at: null,
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    created_at: faker.date.anytime().toString(),
    updated_at: faker.date.anytime().toString(),

  };
};


export const mockReturnAuthentication = () => ({
  access_token: faker.string.uuid(),
    expires_in: faker.number.int(),
    token_type: faker.string.uuid()
})

