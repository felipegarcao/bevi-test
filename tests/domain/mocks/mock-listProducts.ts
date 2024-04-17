import {faker} from '@faker-js/faker';
import { Products } from '../usecases/remote/remote-products';

export enum STATUS  {
  Estoque = 1,
  Reposicao = 2,
  Falta = 3
}

export const MockListProducts = () : Products.Model => ({
  id: faker.number.int(),
  name: faker.person.fullName(),
  price: faker.number.int(),
  description: faker.person.fullName(),
  status: faker.helpers.enumValue(STATUS),
  stock_quantity: faker.number.int(),
})