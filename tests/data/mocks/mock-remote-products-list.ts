

import { Products } from '@/domain/usecases/remote/remote-products';
import { STATUS } from '@/tests/domain/mocks/mock-listProducts';
import {faker} from '@faker-js/faker';


export const mockRemoteProductsModel = (): Products.Model => ({
  id: faker.number.int(),
  name: faker.person.fullName(),
  price: faker.number.int(),
  description: faker.person.fullName(),
  status: faker.helpers.enumValue(STATUS),
  stock_quantity: faker.number.int(),
})

export const mockRemoteProducstListModel = (): Products.Model[] => ([
  mockRemoteProductsModel(),
  mockRemoteProductsModel(),
  mockRemoteProductsModel()
])

